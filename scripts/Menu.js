define(['utils', 'EventEmitter'], function(utils, EventEmitter) {

    'use strict';

    var Menu = function() {

    };

    utils.inherits(Menu, EventEmitter);

    Menu.create = function(options) {
        var type = options.type;
        delete options.type;
        var items = options.items;
        delete options.items;
    };

    return Menu;

});