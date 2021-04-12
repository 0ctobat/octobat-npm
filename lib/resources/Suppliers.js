'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'suppliers',
  includeBasic: ['list', 'create', 'update', 'retrieve', 'del'],
});
