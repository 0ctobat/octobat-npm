'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'tax_evidence_requests',
  includeBasic: [
    'create'
  ],
  forSupplier: octobatMethod({
    method: 'POST',
    path: '/for_supplier'
  })
  
});
