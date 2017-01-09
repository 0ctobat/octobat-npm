'use strict';

var OctobatResource = require('../OctobatResource');
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'payment_sources',
  includeBasic: [
    'list', 'create'
  ],
});
