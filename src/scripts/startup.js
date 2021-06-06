(function(root, factory) {
  'use strict';

  factory.call(root);
}(this, function() {
  "use strict";

  initialize(
    function main() {
      appDomHandler.init();
    },

    function onload(event) {
      appDomHandler.get('app-dev-resources').innerHTML = '';

      var xhr = new XMLHttpRequest();

      xhr.open('GET', './assets/' + '3rdpartylicenses.txt', true);
      
      xhr.onload = function() {
        if (xhr.status != 200) return;
        var licenses = appDomHandler.get('app-3rdPartyLicenses');
        licenses.innerHTML = '<!--' + xhr.response + '-->';
        licenses.append(xhr.response);
        licenses.setAttribute('loaded', true);
      };

      xhr.send();
    },

    function onerror(error) {
      console.error(error);
    }
  );
}));
