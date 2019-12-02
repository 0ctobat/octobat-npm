'use strict';

// ResourceNamespace allows you to create nested resources, i.e. `octobat.beanie.sessions`.
// It also works recursively, so you could do i.e. `octobat.beanie.sessions.fullfil`.

function ResourceNamespace(octobat, resources) {
  for (const name in resources) {
    const camelCaseName = name[0].toLowerCase() + name.substring(1);

    const resource = new resources[name](octobat);

    this[camelCaseName] = resource;
  }
}

module.exports = function(namespace, resources) {
  return function(octobat) {
    return new ResourceNamespace(octobat, resources);
  };
};

module.exports.ResourceNamespace = ResourceNamespace;
