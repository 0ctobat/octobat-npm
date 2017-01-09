'use strict';

var octobatMethod = require('./OctobatMethod');
var utils = require('./utils');

module.exports = {
  create: octobatMethod({
    method: 'POST'
  }),

  list: octobatMethod({
    method: 'GET'
  }),

  retrieve: octobatMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id']
  }),

  update: octobatMethod({
    method: 'PATCH',
    path: '{id}',
    urlParams: ['id']
  }),

  // Avoid 'delete' keyword in JS
  del: octobatMethod({
    method: 'DELETE',
    path: '{id}',
    urlParams: ['id']
  }),
};
