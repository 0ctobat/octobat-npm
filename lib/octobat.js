'use strict';

Octobat.DEFAULT_HOST = 'api.Octobat.com';
Octobat.DEFAULT_PORT = '443';
Octobat.DEFAULT_BASE_PATH = '/'; // Might be versionned in the future

// Use node's default timeout:
Octobat.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Octobat.PACKAGE_VERSION = require('../package.json').version;

Octobat.USER_AGENT = {
  bindings_version: Octobat.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
};

var exec = require('child_process').exec;

var resources = {
  Customers: require('./resources/Customers')
};

function Octobat(key, version) {
  if (!(this instanceof Octobat)) {
    return new Octobat(key);
  }

  this._api = {
    auth: null,
    host: Octobat.DEFAULT_HOST,
    port: Octobat.DEFAULT_PORT,
    basePath: Octobat.DEFAULT_BASE_PATH,
    version: Octobat.DEFAULT_API_VERSION,
    timeout: Octobat.DEFAULT_TIMEOUT,
    agent: null,
    dev: false
  };

  this._prepResources();
  this.setApiVersion(version);
  this.setApiKey(key);
}

Octobat.prototype = {
  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        'Basic ' + new Buffer(key + ':').toString('base64')
      );
    }
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return Octobat[c];
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Octobat.DEFAULT_TIMEOUT : timeout
    );
  },

  getClientUserAgent: function(cb) {
    if (Octobat.USER_AGENT_SERIALIZED) {
      return cb(Octobat.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function(err, uname) {
      Octobat.USER_AGENT.uname = uname || 'UNKNOWN';
      Octobat.USER_AGENT_SERIALIZED = JSON.stringify(Octobat.USER_AGENT);
      cb(Octobat.USER_AGENT_SERIALIZED);
    });
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  _prepResources: function() {

    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  }
};


module.exports = Octobat;
