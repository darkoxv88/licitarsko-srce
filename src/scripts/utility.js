(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) define([], function() { return factory.call(root); });
  else root.initialize = factory.call(root);
}(window, function() {
  'use strict';

  var initialize = function(mainFunc, onloadFunc, onerrorFunc) {
    try {
      if (typeof mainFunc === 'function') mainFunc();
    } catch (e) {
      if (typeof onerror === 'function') onerrorFunc(e);
    }

    if (typeof onloadFunc !== 'function') return;
  
    var init = function() {
      try {
        onloadFunc.apply(this, arguments);
      } catch (e) {
        if (typeof onerrorFunc === 'function') return onerrorFunc(e);
      }
    }
  
    if (window.addEventListener) {
      window.addEventListener("load", init, false);
      return;
    }
  
    if (window.attachEvent) {
      window.attachEvent('onload', init);
      return;
    }
  
    if (typeof window.onload == 'function') {
      var currentWindowOnLoad = window.onload;
  
      var newWindowOnLoad = function(evt) {
        currentWindowOnLoad(evt);
        init(evt);
      };
  
      window.onload = newWindowOnLoad;
      return;
    }
  
    window.onload = init;
  }

  return initialize;
}));
