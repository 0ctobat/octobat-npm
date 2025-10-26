'use strict';

var http = require('http');
var https = require('https');
var path = require('path');
var _ = require('lodash');

var utils = require('./utils');
var Error = require('./Error');

var hasOwn = {}.hasOwnProperty;


// Provide extension mechanism for Octobat Resource Sub-Classes
OctobatResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
OctobatResource.method = require('./OctobatMethod');
OctobatResource.BASIC_METHODS = require('./OctobatMethod.basic');

/**
 * Encapsulates request logic for a Octobat Resource
 */
function OctobatResource(octobat, urlData) {

  this._octobat = octobat;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(octobat.getApiField('basePath'));
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = OctobatResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);

}

OctobatResource.prototype = {

  path: '',

  initialize: function() {},

  // Function to override the default data processor. This allows full control
  // over how a OctobatResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,

  // String that overrides the base API endpoint. If `overrideHost` is not null
  // then all requests for a particular resource will be sent to a base API
  // endpoint as defined by `overrideHost`.
  overrideHost: null,

  createFullPath: function(commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function() {
    var urlData = {};
    // Merge in baseData
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }
    return urlData;
  },

  createDeferred: function(callback) {
    var resolve, reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    if (callback) {
      promise.then(
        (res) => setTimeout(() => callback(null, res), 0),
        (err) => setTimeout(() => callback(err, null), 0)
      );
    }

    return { promise, resolve, reject };
  },

  _timeoutHandler: function(timeout, req, callback) {
    var self = this;
    return function() {
      var timeoutErr = new Error('ETIMEDOUT');
      timeoutErr.code = 'ETIMEDOUT';

      req._isAborted = true;
      req.abort();

      callback.call(
        self,
        new Error.OctobatConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    }
  },

  _responseHandler: function(req, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        var headers = res.headers || {};

        try {
          response = JSON.parse(response);
          if (response.errors) {
            var err;

            response.errors.requestId = headers['request-id'];
            if (res.statusCode === 401) {
              err = new Error.OctobatAuthenticationError(response.errors);
            } else {
              err = Error.OctobatError.generate(response.errors);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.OctobatAPIError({
              message: 'Invalid JSON received from the Octobat API',
              response: response,
              exception: e,
              requestId: headers['request-id']
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function(req, callback) {
    var self = this;
    return function(error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new Error.OctobatConnectionError({
          message: 'An error occurred with our connection to Octobat',
          detail: error
        }),
        null
      );
    }
  },

  _request: async function(method, path, data, auth, options, callback) {
    var self = this;
    var requestData;
    if (self.requestDataProcessor) {
      requestData = self.requestDataProcessor(method, data, options.headers);
    } else {
      requestData = utils.stringifyRequestData(data || {});
    }

    var apiVersion = this._octobat.getApiField('version');
    var headers = {
      'Authorization': auth
        ? 'Basic ' + Buffer.from(auth + ':').toString('base64')
        : this._octobat.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Octobat/v2 NodeBindings/' + this._octobat.getConstant('PACKAGE_VERSION')
    };

    if (apiVersion) {
      headers['Octobat-Version'] = apiVersion;
    }

    if (options.headers) {
      headers = _.extend(headers, options.headers);
    }

    // Build the full URL
    const host = this.overrideHost || this._octobat.getApiField('host');
    const port = this._octobat.getApiField('port');
    const url = `https://${host}${port ? ':' + port : ''}${path}`;

    // Use Fetch API
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: requestData,
        signal: AbortSignal.timeout(this._octobat.getApiField('timeout') || 29000)
      });

      const responseData = await response.text();
      const responseHeaders = {};
      response.headers.forEach((value, name) => {
        responseHeaders[name] = value;
      });

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseData);
      } catch (e) {
        throw new Error.OctobatAPIError({
          message: 'Invalid JSON received from the Octobat API',
          response: responseData,
          exception: e,
          requestId: responseHeaders['request-id']
        });
      }

      if (parsedResponse.errors) {
        let err;
        parsedResponse.errors.requestId = responseHeaders['request-id'];
        if (response.status === 401) {
          err = new Error.OctobatAuthenticationError(parsedResponse.errors);
        } else {
          err = Error.OctobatError.generate(parsedResponse.errors);
        }
        return callback.call(self, err, null);
      }

      if (callback) {
        callback.call(self, null, parsedResponse);
      }
      return parsedResponse;
    } catch (error) {
      console.error('Fetch error:', error);
      if (callback) {
        return callback.call(
            self,
            new Error.OctobatAPIError({
              message: 'Invalid JSON received from the Octobat API',
              exception: e,
              requestId: headers['request-id']
            }),
            null
          );
      }
      throw error;
    }
  },

  _request2: function(method, path, data, auth, options, callback) {
    var self = this;
    var requestData;

    if (self.requestDataProcessor) {
      requestData = self.requestDataProcessor(method, data, options.headers);
    } else {
      requestData = utils.stringifyRequestData(data || {});
    }

    var apiVersion = this._octobat.getApiField('version');

    var headers = {
      // Use specified auth token or use default from this octobat instance:
      'Authorization': auth ?
        'Basic ' + new Buffer(auth + ':').toString('base64') :
        this._octobat.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': requestData.length,
      'User-Agent': 'Octobat/v2 NodeBindings/' + this._octobat.getConstant('PACKAGE_VERSION')
    };

    if (apiVersion) {
      headers['Octobat-Version'] = apiVersion;
    }

    // Grab client-user-agent before making the request:
    this._octobat.getClientUserAgent(function(cua) {
      headers['X-Octobat-Client-User-Agent'] = cua;

      if (options.headers) {
        headers = _.extend(headers, options.headers);
      }

      makeRequest();
    });


    function makeRequest() {

      var timeout = self._octobat.getApiField('timeout');
      var isInsecureConnection = self._octobat.getApiField('protocol') == 'http';

      var host = self.overrideHost || self._octobat.getApiField('host');

      var req = (
        isInsecureConnection ? http : https
      ).request({
        host: host,
        port: self._octobat.getApiField('port'),
        path: path,
        method: method,
        agent: self._octobat.getApiField('agent'),
        headers: headers,
        ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5"
      });

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      req.on('error', self._errorHandler(req, callback));

      req.on('socket', function(socket) {
        socket.on((isInsecureConnection ? 'connect' : 'secureConnect'), function() {
          // Send payload; we're safe:
          req.write(requestData);
          req.end();
        });
      });

    }

  }

};

module.exports = OctobatResource;
