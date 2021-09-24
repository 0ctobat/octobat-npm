'use strict';

var OctobatResource = require('../OctobatResource');
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'outbound_transactions',
  includeBasic: [
    'create', 'list', 'retrieve'
  ],
});
