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

  describe('update', function() {
    it('Sends the correct request', function() {
      var opts = {
        name: 'Bleh',
        billing_address_line1: '42 moon street',
        vat_number: '0123456789'
      }

      octobat.customers.update('oc_cu_1421878635hksc26e4de79', opts);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/customers/oc_cu_1421878635hksc26e4de79',
        headers: {},
        data: opts
      });
    });
  });

  describe('create', function() {
    var opts = { name: 'Some customer' };

    it('Sends the correct request', function() {
      octobat.customers.create(opts);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/customers',
        headers: {},
        data: opts
      });
    });

    it('Sends the correct request [with specified auth]', function() {
      octobat.customers.create(opts, TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/customers',
        headers: {},
        data: opts,
        auth: TEST_AUTH_KEY
      });
    });

    it('Sends the correct request [with specified auth and no body]', function() {
      octobat.customers.create(TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/customers',
        headers: {},
        data: {},
        auth: TEST_AUTH_KEY
      });
    });

    it('Sends the correct request [with specified auth in options]', function() {
      octobat.customers.create(opts, { api_key: TEST_AUTH_KEY });
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/customers',
        headers: {},
        data: opts,
        auth: TEST_AUTH_KEY
      });
    });

    it('Sends the correct request [with specified auth in options and no body]', function() {
      octobat.customers.create({ api_key: TEST_AUTH_KEY });
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/customers',
        headers: {},
        data: {},
        auth: TEST_AUTH_KEY
      });
    });
  });
});
