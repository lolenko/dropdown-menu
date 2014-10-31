define(['exports', 'utils', 'EventEmitter', 'MenuItem', 'Submenu'], function(exports, utils, EventEmitter, MenuItem, Submenu) {

    'use strict';

    var Submenu = Submenu.Submenu;

    var KEY = {
        DOWN: 40,
        UP: 38,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        ESCAPE: 27
    };

    var Menu = function(items, params) {
        this.rootEl = utils.tmpl(Menu.TEMPLATE);
        this.items = [];
        this.isFocused = false;
        this.focusedItem = null;
        items.forEach(this.append.bind(this));
    };

    utils.inherits(Menu, EventEmitter);


    Menu.TEMPLATE = '<div class="menu"></div>';
    Menu.KEY = KEY;

    Menu.prototype.each = function(cb) {
        this.items.forEach(cb);
    };

    Menu.prototype.drawFocusTo = function(targetEl) {
        this.each((function(item) {
            if (item.rootEl.contains(targetEl)) {
                this.clearFocus();
                item.focus();
                this.focusedItem = item;
                if (item.menu instanceof Menu) {
                    item.menu.drawFocusTo(targetEl);
                }
            }
        }).bind(this));
    };

    Menu.prototype.clearFocus = function() {
        this.focusedItem = null;
        this.each((function(item) {
            item.blur();
            if (item.menu instanceof Menu) {
                item.menu.clearFocus();
            }
        }).bind(this));
    };

    Menu.prototype.checkMouseBlurFor = function(target) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.menu instanceof Menu) {
                var targetItem = item.menu.checkMouseBlurFor(target);
                if (targetItem instanceof MenuItem) {
                    return targetItem;
                }
            }
            if (item.rootEl.contains(target)) {
                item.blur();
                this.focusedItem = null;
                return item;
            }
        }
        return null;
    };

    Menu.prototype.handleKey = function(key) {
        if (this.focusedItem === null) {
            if (key == KEY.RIGHT) {
                this.enter();
                return true;
            } else {
                return false;
            }
        }

        if (this.focusedItem instanceof Submenu && this.focusedItem.menu.handleKey(key)) {
            return true;
        } else {
            switch (key) {
                case KEY.DOWN:
                    this.focusNext();
                    return true;
                    break;
                case KEY.UP:
                    this.focusPrev();
                    return true;
                    break;
                case KEY.LEFT:
                    if (this.focusedItem instanceof Submenu && this.focusedItem.menu.focusedItem) {
                        this.focusedItem.menu.clearFocus();
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

    Menu.prototype.enter = function() {
        var enabledItems = this.getEnabledItems();
        enabledItems[0] && (this.focusedItem = enabledItems[0]) && enabledItems[0].focus();
    };

    Menu.prototype.focusNext = function() {
        var enabledItems = this.getEnabledItems();
        var curIndex = enabledItems.indexOf(this.focusedItem);
        if (curIndex === enabledItems.length - 1) {
            return;
        }
        var nextItem = enabledItems[++curIndex];
        this.focusedItem.blur();
        nextItem.focus();
        this.focusedItem = nextItem;
    };

    Menu.prototype.focusPrev = function() {
        var enabledItems = this.getEnabledItems();
        var curIndex = enabledItems.indexOf(this.focusedItem);
        if (curIndex === 0) {
            return;
        }
        var prevItem = enabledItems[--curIndex];
        this.focusedItem.blur();
        prevItem.focus();
        this.focusedItem = prevItem;
    };

    Menu.prototype.getEnabledItems = function() {
        return this.items.filter(function(item) {
            return !item.isDisabled;
        });
    };

    Menu.prototype.append = function(item) {
        this.items.push(item);
        this.rootEl.appendChild(item.rootEl);
        item.setParentMenu(this);
        return this;
    };

    exports.Menu = Menu;

});