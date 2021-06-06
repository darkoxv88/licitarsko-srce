(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) define([], function() { return factory.call(root); });
  else root.appDomHandler = factory.call(root);
}(window, function() {
  'use strict';

  var listToGet = [
    'app-3rdPartyLicenses',
    'app-utility',
    'app-dev-resources',
    'app-trash',
  ];

  var domElementsList = { };

  var init = function () {
    for (let i = 0; i < listToGet.length; i++) {
      var node = document.querySelectorAll('#' + listToGet[i])[0];

      if (node) domElementsList[listToGet[i]] = node;
    }

    listToGet = null;

    init = null;
  };

  var publicGet = function(id) {
    if (typeof(id) === 'string') return domElementsList[id];
  }

  var publicEmptyNode = function(id) {
    if (typeof(id) === 'string') domElementsList[id].innerHTML = '';
  }

  var modules = {
    init: init,
    get: publicGet,
    emptyNode: publicEmptyNode,
  };

  Object.freeze(modules);

  return modules;
}));
