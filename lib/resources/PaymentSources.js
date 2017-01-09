'use strict';

var OctobatResource = require('../OctobatResource');
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'customers/{customerId}/payment_sources',
  includeBasic: [
    'list', 'create'
  ],
});
