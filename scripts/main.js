require.config({
    baseUrl: "scripts"
});

require(['MenuItem'], function(MenuItem) {

    'use strict';

    [].forEach.call(document.querySelectorAll('.menu-item'), function(item) {
        new MenuItem(item);
    });

});
