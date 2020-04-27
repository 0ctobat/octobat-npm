'use strict';

var OctobatResource = require('../OctobatResource');
var octobatMethod = OctobatResource.method;
var utils = require('../utils');

module.exports = OctobatResource.extend({
  path: 'orders',
  includeBasic: [
    'list', 'retrieve', 'update'
  ],
  
  listOrderItems: octobatMethod({
    method: 'GET',
    path: '/{orderId}/order_items',
    urlParams: ['orderId'],
  }),
  
});
