'use strict';

var OctobatResource = require('../OctobatResource');
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'numbering_sequences',
  includeBasic: [
    'list'
  ],
});
