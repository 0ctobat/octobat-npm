'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'customers',
  includeBasic: [
    'create', 'list', 'retrieve', 'update'
  ],
  
  createPaymentSource: octobatMethod({
    method: 'POST',
    path: '/{customerId}/payment_sources',
    urlParams: ['customerId'],
  }),

  listPaymentSources: octobatMethod({
    method: 'GET',
    path: '/{customerId}/payment_sources',
    urlParams: ['customerId'],
  }),

  retrievePaymentSource: octobatMethod({
    method: 'GET',
    path: '/{customerId}/payment_sources/{paymentSourceId}',
    urlParams: ['customerId', 'paymentSourceId'],
  }),

  updatePaymentSource: octobatMethod({
    method: 'PATCH',
    path: '/{customerId}/payment_sources/{paymentSourceId}',
    urlParams: ['customerId', 'paymentSourceId'],
  })

  
});
