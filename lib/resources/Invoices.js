'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'invoices',
  includeBasic: [
    'create', 'list', 'retrieve', 'update'
  ],

  pay: octobatMethod({
    method: 'PATCH',
    path: '/{invoiceId}/pay',
    urlParams: ['invoiceId']
  }),
  
  send: octobatMethod({
    method: 'POST',
    path: '/{invoiceId}/send',
    urlParams: ['invoiceId']
  }),
  
  confirm: octobatMethod({
    method: 'PATCH',
    path: '/{invoiceId}/confirm',
    urlParams: ['invoiceId']
  }),
});
