define(['utils', 'Menu', 'Submenu', 'MenuItem'], function(utils, Menu, Submenu, MenuItem) {

    'use strict';

    var Submenu = Submenu.Submenu;
    var Menu = Menu.Menu;
    var KEY = Menu.KEY;

    var MenuManager = function(items) {
        Menu.call(this, items);
        this.rootEl.addEventListener('mouseover', this.onMouseOver.bind(this), false);
        this.rootEl.addEventListener('mouseout', this.onMouseOut.bind(this), false);
        window.addEventListener('click', this.onClick.bind(this), false);
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
    };

    utils.inherits(MenuManager, Menu);

    MenuManager.create = function(params) {
        var type = params.type;
        delete params.type;
        var item;

        switch (type) {
            case 'menu':
                var itemsParams = params.items;
                delete params.items;
                var items = [];
                itemsParams.forEach(function(item) {
                    items.push(MenuManager.create(item));
                });
                item =  new MenuManager(items, params);
                break;
            case 'submenu':
                var itemsParams = params.items;
                delete params.items;
                var items = [];
                itemsParams.forEach(function(item) {
                    items.push(MenuManager.create(item));
                });
                item = new Submenu(items, params);
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

    MenuManager.prototype.onMouseOver = function(e) {
        this.drawFocusTo(e.target);
    };

    MenuManager.prototype.onMouseOut = function(e) {
        this.checkMouseBlurFor(e.target);
    };

    MenuManager.prototype.onClick = function(e) {
        if (!this.rootEl.contains(e.target)) {
            this.clearFocus();
        }
    };

    MenuManager.prototype.onKeyDown = function(e) {
        var key = e.which;
        this.handleKey(key);
    };

    MenuManager.prototype.handleKey = function(key) {
        if (key = KEY.ESCAPE) {
            this.clearFocus();
            return;
        }
        if (this.focusedItem === null) {
            return false;
        }

        if (this.focusedItem instanceof Submenu && this.focusedItem.menu.handleKey(key)) {
            return true;
        } else {
            switch (key) {
                case KEY.RIGHT:
                    this.focusNext();
                    return true;
                    break;
                case KEY.LEFT:
                    this.focusPrev();
                    return true;
                    break;
                case KEY.DOWN:
                    if (this.focusedItem instanceof Submenu) {
                        this.focusedItem.menu.enter();
                        return true;
                    }
                    break;
                case KEY.ENTER:
                    if (!(this.focusedItem instanceof Submenu)) {
                        this.focusedItem.execute();
                        return true;
                    }
                    break;
            }
        }
    };

    return MenuManager;

});