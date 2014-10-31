define(['exports', 'utils', 'Menu', 'MenuItem', 'Dropdown'], function(exports, utils, Menu, MenuItem, Dropdown) {

    'use strict';

    var Submenu = function(items, params) {
        MenuItem.call(this, {
            activateOn: 'mouseenter',
            caption: params.caption
        });
        this.menu = new Menu.Menu(items);
        this.dropdown = new Dropdown({
            relatedTarget: this.rootEl,
            position: params.dropdownPosition,
            offset: 0
        });
        this.dropdown.append(this.menu);
        this.rootEl.appendChild(this.dropdown.rootEl);
        this.rootEl.classList.add('menu-item_submenu');
        this.menu.rootEl.classList.add('menu_dropdown');
        //this.setCommand(this.dropdown.expand.bind(this.dropdown));
    };

    utils.inherits(Submenu, MenuItem);

    Submenu.prototype.focus = function() {
        MenuItem.prototype.focus.apply(this, arguments);
        this.dropdown.expand();
    };

    Submenu.prototype.blur = function() {
        this.focus(false);
        this.dropdown.close();
    };

    exports.Submenu = Submenu;

});