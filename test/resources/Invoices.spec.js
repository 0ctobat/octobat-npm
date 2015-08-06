'use strict';

var octobat = require('../testUtils').getSpyableOctobat();
var expect = require('chai').expect;
var Promise = require('bluebird');

var TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Invoices Resource', function() {
  describe('create', function() {
    var opts = {
      livemode: false,
      state: 'confirmed',
      currency: 'usd',
      customer_id: 'oc_cus_424424242',
      evidence: {
        field_1: 'meta1',
        field_2: 'meta2',
      },
      invoice_items: [{}]
    };

    it('Sends the correct request', function() {
      octobat.invoices.create(opts);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/invoices',
        headers: {},
        data: opts
      });
    });

    it('Sends the correct request [with specified auth]', function() {
      octobat.invoices.create(opts, TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/invoices',
        headers: {},
        data: opts,
        auth: TEST_AUTH_KEY
      });
    });

    it('Sends the correct request [with specified auth and no body]', function() {
      octobat.invoices.create(TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/invoices',
        headers: {},
        data: {},
        auth: TEST_AUTH_KEY
      });
    });

    it('Sends the correct request [with specified auth in options]', function() {
      octobat.invoices.create(opts, { api_key: TEST_AUTH_KEY });
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/invoices',
        headers: {},
        data: opts,
        auth: TEST_AUTH_KEY
      });
    });

    it('Sends the correct request [with specified auth in options and no body]', function() {
      octobat.invoices.create({ api_key: TEST_AUTH_KEY });
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/invoices',
        headers: {},
        data: {},
        auth: TEST_AUTH_KEY
      });
    });
  });

  describe('pay', function() {
    it('Sends the correct request', function() {
      var opts = { payment: {field_1: 'one', field_2: 'two'} };
      octobat.invoices.pay('oc_in_424242', opts);

      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'PATCH',
        url: '/invoices/oc_in_424242/pay',
        headers: {},
        data: opts
      });
    });
  });
});
