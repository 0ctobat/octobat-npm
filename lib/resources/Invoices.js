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
  
  cancel: octobatMethod({
    method: 'PATCH',
    path: '/{invoiceId}/cancel',
    urlParams: ['invoiceId']
  }),
  
  cancelAndReplace: octobatMethod({
    method: 'PATCH',
    path: '/{invoiceId}/cancel_and_replace',
    urlParams: ['invoiceId']
  }),
  
  delete: octobatMethod({
    method: 'DELETE',
    path: '/{invoiceId}',
    urlParams: ['invoiceId']
  }),
  
  createItem: octobatMethod({
    method: 'POST',
    path: '/{invoiceId}/items',
    urlParams: ['invoiceId'],
  }),

  listItems: octobatMethod({
    method: 'GET',
    path: '/{invoiceId}/items',
    urlParams: ['invoiceId'],
  }),

  retrieveItem: octobatMethod({
    method: 'GET',
    path: '/{invoiceId}/items/{itemId}',
    urlParams: ['invoiceId', 'itemId'],
  }),

  updateItem: octobatMethod({
    method: 'PATCH',
    path: '/{invoiceId}/items/{itemId}',
    urlParams: ['invoiceId', 'itemId'],
  })
});
