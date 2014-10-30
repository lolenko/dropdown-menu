define(['utils', 'EventEmitter', 'MenuItem', 'Dropdown', 'DropdownMenu'], function(utils, EventEmitter, MenuItem, Dropdown, DropdownMenu) {

    'use strict';

    var Menu = function(items, params) {
        this.rootEl = utils.tmpl(Menu.TEMPLATE);
        this.items = [];
        items.forEach(this.append.bind(this));
    };

    utils.inherits(Menu, EventEmitter);

    Menu.create = function(params) {
        var type = params.type;
        delete params.type;
        var item;

        switch (type) {
            case 'menu':
                var itemsParams = params.items;
                delete params.items;
                var items = [];
                itemsParams.forEach(function(item) {
                    items.push(Menu.create(item));
                });
                item =  new Menu(items, params);
                break;
            case 'submenu':
                var itemsParams = params.items;
                delete params.items;
                var items = [];
                itemsParams.forEach(function(item) {
                    items.push(Menu.create(item));
                });
                item = new DropdownMenu(items, params);
                item.rootEl.classList.add('menu__item');
                break;
            case 'item':
                item = new MenuItem(params);
                item.rootEl.classList.add('menu__item');
                break;
            default:
                break;
        }
        return item;
    };

    Menu.TEMPLATE = '<div class="menu"></div>';

    Menu.prototype.each = function(cb) {
        this.items.forEach(cb);
    };

    Menu.prototype.close = function() {
        this.each(function(item) {
            if (item instanceof DropdownMenu) {
                item.close();
            }
        });
    };

    Menu.prototype.append = function(item) {
        this.items.push(item);
        this.rootEl.appendChild(item.rootEl);
        item.setParentMenu(this);
        return this;
    };



    return Menu;

});