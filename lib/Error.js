'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by octobat-node
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Octobat's REST API)
 */
var OctobatError = _Error.OctobatError = _Error.extend({
  type: 'OctobatError',
  populate: function(raw) {

    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = this.handleMessage(raw);
    this.detail = raw.detail;
    this.raw = raw;
    this.requestId = raw.requestId;
  },
  handleMessage: function(raw) {
    var msg = "";
    
    for (var key in raw) {
      if (key == 'requestId')
        continue;
        
      var k_msg = key + ': ';
      for (var api_key_err in raw[key]) {
        k_msg += raw[key][api_key_err].details + ". "
      }
      msg += k_msg
    }
    console.log(msg);
    return msg;
  }
});

/**
 * Helper factory which takes raw octobat errors and outputs wrapping instances
 */
OctobatError.generate = function(rawOctobatError) {
  return new _Error.OctobatInvalidRequestError(rawOctobatError);  
};

// Specific Octobat Error types:
_Error.OctobatInvalidRequestError = OctobatError.extend({ type: 'OctobatInvalidRequest' });
_Error.OctobatAPIError = OctobatError.extend({ type: 'OctobatAPIError' });
_Error.OctobatAuthenticationError = OctobatError.extend({ type: 'OctobatAuthenticationError' });
_Error.OctobatConnectionError = OctobatError.extend({ type: 'OctobatConnectionError' });
