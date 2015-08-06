'use strict';

var octobat = require('../testUtils').getSpyableOctobat();
var expect = require('chai').expect;

var TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Payment modes Resource', function() {
  describe('list', function() {
    it('Sends the correct request', function() {
      octobat.paymentModes.list();
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/payment_modes',
        headers: {},
        data: {}
      });
    });

    it('Sends the correct request [with specified auth]', function() {
      octobat.paymentModes.list(TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/payment_modes',
        headers: {},
        data: {},
        auth: TEST_AUTH_KEY
      });
    });

    it('handles pagination', function() {
      var opts = {
        limit: 2,
        starting_after: '1992-02-27'
      };

      octobat.paymentModes.list(opts);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/payment_modes',
        headers: {},
        data: opts
      });
    });
  });
});
