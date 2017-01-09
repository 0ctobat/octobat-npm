'use strict';

var octobat = require('../testUtils').getSpyableOctobat();
var expect = require('chai').expect;

var TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Numbering Sequences Resource', function() {
  describe('list', function() {
    it('Sends the correct request', function() {
      octobat.invoiceNumberingSequences.list();
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/invoice_numbering_sequences',
        headers: {},
        data: {}
      });
    });

    it('Sends the correct request [with specified auth]', function() {
      octobat.invoiceNumberingSequences.list(TEST_AUTH_KEY);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/invoice_numbering_sequences',
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

      octobat.invoiceNumberingSequences.list(opts);
      expect(octobat.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/invoice_numbering_sequences',
        headers: {},
        data: opts
      });
    });
  });
});
