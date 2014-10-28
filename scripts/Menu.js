define(['utils', 'EventEmitter', 'MenuItem', 'Dropdown'], function(utils, EventEmitter, MenuItem, Dropdown) {

    'use strict';

    var Menu = function(items, params) {
        this.rootEl = utils.tmpl(Menu.TEMPLATE, {caption: params.caption});
        this.button = new MenuItem({
            caption: params.caption
        });
        this.dropdown = new Dropdown(items, {relatedTarget: this.button.rootEl});
        this.rootEl.appendChild(this.button.rootEl);
        this.rootEl.appendChild(this.dropdown.rootEl);
        console.log(this.rootEl);
        this.items = items;
    };

    utils.inherits(Menu, EventEmitter);

    Menu.create = function(params) {
        var type = params.type;
        delete params.type;

        switch (type) {
            case 'menu':
                var itemsParams = params.items;
                delete params.items;
                var items = [];
                itemsParams.forEach(function(item) {
                    items.push(Menu.create(item));
                });
                return new Menu(items, params);
                break;
            case 'item':
                return new MenuItem(params);
                break;
            default:
                break;
        }
    };

    Menu.TEMPLATE = '<div class="menu"></div>';

    Menu.prototype.each = function(cb) {
        this.items.forEach(cb);
    };

    Menu.prototype.close = function() {
        this.each(function(item) {
            if (item instanceof Menu) {
                item.close();
            }
        });
    };



    return Menu;

});