'use strict';

var OctobatResource = require('../../OctobatResource');
var utils = require('../../utils');

module.exports = OctobatResource.extend({
  path: 'beanie/sessions',
  includeBasic: [
    'retrieve', 'create'
  ],
});
