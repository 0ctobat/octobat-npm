'use strict';

var expect = require('chai').expect;

var octobat = require('../lib/octobat')(process.env.OCTOBAT_TEST_API_KEY);

describe('Octobat Module', function() {
  describe('setTimeout', function() {
    it('Should define a default equal to the node default', function() {
      expect(octobat.getApiField('timeout')).to.equal(require('http').createServer().timeout);
    });
    it('Should allow me to set a custom timeout', function() {
      octobat.setTimeout(900);
      expect(octobat.getApiField('timeout')).to.equal(900);
    });
    it('Should allow me to set null, to reset to the default', function() {
      octobat.setTimeout(null);
      expect(octobat.getApiField('timeout')).to.equal(require('http').createServer().timeout);
    });
  });

  describe('authentication', function() {
    it('works when key is valid', function(done) {
      octobat.customers.list({limit: 1}, function(err, result) {
        expect(result).to.be.an('object');
        expect(result.data).to.have.length(1)
        done(err);
      });
    });

    it('returns an error when key is invalid', function(done) {
      octobat.setApiKey('WRONG');

      octobat.customers.list({}, function(err, result) {
        expect(err).to.be.an('object');
        done();
      })
    });
  });
});
