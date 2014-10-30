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
            caption: params.caption,
            activateOn: params.activateOn
        });
        this.dropdown = new Dropdown({
            relatedTarget: this.button.rootEl,
            position: params.dropdownPosition,
            offset: params.dropdownOffset
        });
        this.button.setCommand(this.dropdown.expand.bind(this.dropdown))
        this.dropdown.rootEl.classList.add('menu__dropdown');
        this.rootEl.appendChild(this.button.rootEl);
        this.rootEl.appendChild(this.dropdown.rootEl);
        this.items = [];
        items.forEach(this.append.bind(this));
        this.parentMenu = null;
    };

    utils.inherits(DropdownMenu, EventEmitter);

    DropdownMenu.TEMPLATE = '<div class="menu menu_dropdown"></div>';

    DropdownMenu.prototype.each = function(cb) {
        this.items.forEach(cb);
    };

    DropdownMenu.prototype.close = function() {
        this.each(function(item) {
            if (item instanceof DropdownMenu) {
                item.close();
            }
        });
    };

    DropdownMenu.prototype.append = function(item) {
        this.items.push(item);
        this.dropdown.append(item);
        item.setParentMenu(this);
        return this;
    };

    DropdownMenu.prototype.setParentMenu = function(menu) {
        this.parentMenu = menu;
        this.button.on('blur', this.parentMenu.close.bind(this));
    };

    return DropdownMenu;

});