'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'payment_recipients',
  includeBasic: [
    'create', 'list', 'retrieve', 'update'
  ]
});
