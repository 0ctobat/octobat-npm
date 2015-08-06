'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));

var utils = module.exports = {

  getUserOctobatKey: function() {
    var key = process.env.OCTOBAT_TEST_API_KEY;

    return key;
  },

  getSpyableOctobat: function() {
    // Provide a testable octobat instance
    // That is, with mock-requests built in and hookable

    var Octobat = require('../lib/octobat');
    var octobatInstance = Octobat('fakeAuthToken');

    octobatInstance.REQUESTS = [];

    for (var i in octobatInstance) {
      if (octobatInstance[i] instanceof Octobat.OctobatResource) {

        // Override each _request method so we can make the params
        // available to consuming tests (revealing requests made on
        // REQUESTS and LAST_REQUEST):
        octobatInstance[i]._request = function(method, url, data, auth, options, cb) {
          var req = octobatInstance.LAST_REQUEST = {
            method: method,
            url: url,
            data: data,
            headers: options.headers || {},
          };
          if (auth) req.auth = auth;
          octobatInstance.REQUESTS.push(req);
          cb.call(this, null, {});
        };

      }
    }

    return octobatInstance;

  },
};
