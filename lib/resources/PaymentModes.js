'use strict';

var OctobatResource = require('../OctobatResource');
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'payment_modes',
  includeBasic: [
    'list'
  ],
});
