'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'credit_notes',
  includeBasic: [
    'create', 'list', 'retrieve', 'update'
  ],
  
  sendByEmail: octobatMethod({
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
