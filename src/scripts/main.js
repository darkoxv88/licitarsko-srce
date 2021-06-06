// import nacini
/*
declare var variableName:any;

import * as variable from 'variableName';
*/

(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) define([], function() { return factory.call(root); });
  else root.p5jsUtility = factory.call(root);
}(window, function() {
  'use strict';

  var p5jsUtility;

  new p5(s => {
    p5jsUtility = s;
  });

  return p5jsUtility;
}));
