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
    path: '/{creditNoteId}/send',
    urlParams: ['creditNoteId']
  }),
  
  confirm: octobatMethod({
    method: 'PATCH',
    path: '/{creditNoteId}/confirm',
    urlParams: ['creditNoteId']
  }),
  
  createItem: octobatMethod({
    method: 'POST',
    path: '/{creditNoteId}/items',
    urlParams: ['creditNoteId'],
  }),

  listItems: octobatMethod({
    method: 'GET',
    path: '/{creditNoteId}/items',
    urlParams: ['creditNoteId'],
  }),

  retrieveItem: octobatMethod({
    method: 'GET',
    path: '/{creditNoteId}/items/{itemId}',
    urlParams: ['creditNoteId', 'itemId'],
  }),

  updateItem: octobatMethod({
    method: 'PATCH',
    path: '/{creditNoteId}/items/{itemId}',
    urlParams: ['creditNoteId', 'itemId'],
  })
  

});
