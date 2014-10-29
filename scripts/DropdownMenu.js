define(['utils', 'EventEmitter', 'MenuItem', 'Dropdown'], function(utils, EventEmitter, MenuItem, Dropdown) {

    'use strict';

    var DropdownMenu = function(items, params) {
        this.rootEl = utils.tmpl(DropdownMenu.TEMPLATE);
        params = utils.extend({
            activateOn: 'click',
            dropdownPosition: 'auto',
            dropdownOffset: 0,
            caption: 'unnamed',
            disabled: 'false'
        }, params);
        this.button = new MenuItem({
            caption: params.caption
        });
        this.dropdown = new Dropdown(items, {
            relatedTarget: this.button.rootEl,
            position: params.dropdownPosition,
            offset: params.dropdownOffset
        });
        this.button.setCommand(this.dropdown.expand.bind(this.dropdown))
        this.dropdown.rootEl.classList.add('menu__dropdown');
        this.rootEl.appendChild(this.button.rootEl);
        this.rootEl.appendChild(this.dropdown.rootEl);
        console.log(this.rootEl);
        this.items = items;
    };

    utils.inherits(DropdownMenu, EventEmitter);

    DropdownMenu.TEMPLATE = '<div class="menu menu_dropdown"></div>';

    DropdownMenu.prototype.each = function(cb) {
        this.items.forEach(cb);
    };

    DropdownMenu.prototype.close = function() {
        this.each(function(item) {
            if (item instanceof Menu) {
                item.close();
            }
        });
    };

    return DropdownMenu;

});