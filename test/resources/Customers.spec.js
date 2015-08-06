'use strict';

var octobat = require('../testUtils').getSpyableOctobat();
var expect = require('chai').expect;
var Promise = require('bluebird');

var TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Customers Resource', function() {
  describe('retrieve', function() {
    it('Sends the correct request', function() {
      octobat.customers.retrieve('oc_cu_1421878635hksc26e4de79');
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/customers/oc_cu_1421878635hksc26e4de79',
        headers: {},
        data: {}
      });
    });

    it('Sends the correct request [with specified auth]', function() {
      octobat.customers.retrieve('oc_cu_1421878635hksc26e4de79', TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/customers/oc_cu_1421878635hksc26e4de79',
        headers: {},
        data: {},
        auth: TEST_AUTH_KEY
      });
    });
  });

  describe('list', function() {
    it('Sends the correct request', function() {
      octobat.customers.list();
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/customers',
        headers: {},
        data: {}
      });
    });

    it('Sends the correct request [with specified auth]', function() {
      octobat.customers.list(TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/customers',
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

      octobat.customers.list(opts);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/customers',
        headers: {},
        data: opts
      });
    });
  });
});
