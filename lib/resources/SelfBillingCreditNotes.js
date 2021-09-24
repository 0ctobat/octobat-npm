'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'self_billing_credit_notes',
  includeBasic: [
    'create', 'list', 'retrieve', 'update'
  ],
  
  sendByEmail: octobatMethod({
    method: 'POST',
    path: '/{selfBillingCreditNoteId}/send',
    urlParams: ['selfBillingCreditNoteId']
  }),
  
  confirm: octobatMethod({
    method: 'PATCH',
    path: '/{selfBillingCreditNoteId}/confirm',
    urlParams: ['selfBillingCreditNoteId']
  }),
  
  cancel: octobatMethod({
    method: 'PATCH',
    path: '/{selfBillingCreditNoteId}/cancel',
    urlParams: ['selfBillingCreditNoteId']
  }),
  
  
  delete: octobatMethod({
    method: 'DELETE',
    path: '/{selfBillingCreditNoteId}',
    urlParams: ['selfBillingCreditNoteId']
  }),
  
  createPurchaseItem: octobatMethod({
    method: 'POST',
    path: '/{selfBillingCreditNoteId}/purchase_items',
    urlParams: ['selfBillingCreditNoteId'],
  }),

  listPurchaseItems: octobatMethod({
    method: 'GET',
    path: '/{selfBillingCreditNoteId}/purchase_items',
    urlParams: ['selfBillingCreditNoteId'],
  }),

  retrievePurchaseItem: octobatMethod({
    method: 'GET',
    path: '/{selfBillingCreditNoteId}/purchase_items/{purchaseItemId}',
    urlParams: ['selfBillingCreditNoteId', 'purchaseItemId'],
  }),

  updatePurchaseItem: octobatMethod({
    method: 'PATCH',
    path: '/{selfBillingCreditNoteId}/purchase_items/{purchaseItemId}',
    urlParams: ['selfBillingCreditNoteId', 'purchaseItemId'],
  })
});
