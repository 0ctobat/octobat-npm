'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'invoices',
  includeBasic: [
    'create'
  ],

  pay: octobatMethod({
    method: 'PATCH',
    path: '/{invoiceId}/pay',
    urlParams: ['invoiceId']
  }),
});
