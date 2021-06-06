(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) define([], function() { return factory.call(root); });
  else root.environment = factory.call(root);
}(window, function() {
  'use strict';

  var environment = {
    production: false,
  }

  Object.freeze(environment);

  return environment;
}));
