'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'self_billing_invoices',
  includeBasic: [
    'create', 'list', 'retrieve', 'update'
  ],
  
  sendByEmail: octobatMethod({
    method: 'POST',
    path: '/{selfBillingInvoiceId}/send',
    urlParams: ['selfBillingInvoiceId']
  }),
  
  confirm: octobatMethod({
    method: 'PATCH',
    path: '/{selfBillingInvoiceId}/confirm',
    urlParams: ['selfBillingInvoiceId']
  }),
  
  cancel: octobatMethod({
    method: 'PATCH',
    path: '/{selfBillingInvoiceId}/cancel',
    urlParams: ['selfBillingInvoiceId']
  }),
  
  
  delete: octobatMethod({
    method: 'DELETE',
    path: '/{selfBillingInvoiceId}',
    urlParams: ['selfBillingInvoiceId']
  }),
  
  createPurchaseItem: octobatMethod({
    method: 'POST',
    path: '/{selfBillingInvoiceId}/purchase_items',
    urlParams: ['selfBillingInvoiceId'],
  }),

  listPurchaseItems: octobatMethod({
    method: 'GET',
    path: '/{selfBillingInvoiceId}/purchase_items',
    urlParams: ['selfBillingInvoiceId'],
  }),

  retrievePurchaseItem: octobatMethod({
    method: 'GET',
    path: '/{selfBillingInvoiceId}/purchase_items/{purchaseItemId}',
    urlParams: ['selfBillingInvoiceId', 'purchaseItemId'],
  }),

  updatePurchaseItem: octobatMethod({
    method: 'PATCH',
    path: '/{selfBillingInvoiceId}/purchase_items/{purchaseItemId}',
    urlParams: ['selfBillingInvoiceId', 'purchaseItemId'],
  })
});
