define(['utils', 'EventEmitter'], function(utils, EventEmitter) {

    'use strict';

    var CSS_MODIFIERS = {
        DISABLED: 'menu-item_disabled',
        PENDING: 'menu-item_pending',
        FOCUSED: 'menu-item_focused'
    };

    var EVENTS = {
        PENDING_START: 'pendingstart',
        PENDING_END: 'pendingend',
        FOCUS: 'focus',
        BLUR: 'blur',
        ENABLE: 'enable',
        DISABLE: 'disable',
        EXECUTE: 'execute'
    };

    var CSS_ANIMATIONS = {
        PENDING: 'menu-item-pending'
    };

    var MenuItem = function(rootEl, params) {
        params = utils.extend({
            command: (function() { console.log('execute ', this); }).bind(this),
            activateOn: 'click'
        }, params);
        this.rootEl = rootEl;
        this.command = params.command;
        this.disabled = rootEl.classList.contains(CSS_MODIFIERS.DISABLED);
        this.isPending = false;
        this.isFocused = false;
        rootEl.addEventListener(params.activateOn, this.execute.bind(this), false);
        rootEl.addEventListener('webkitAnimationEnd', (function(e) {
            e.stopPropagation();
            if (e.animationName === CSS_ANIMATIONS.PENDING) {
                this.emit(EVENTS.PENDING_END, e);
            }
        }).bind(this), false);
    };

    utils.inherits(MenuItem, EventEmitter);

    MenuItem.CSS_MODIFIERS = CSS_MODIFIERS;
    MenuItem.EVENTS = EVENTS;
    MenuItem.CSS_ANIMATIONS = CSS_ANIMATIONS;

    MenuItem.prototype.execute = function(e) {
        e && e.stopPropagation && e.stopPropagation();
        if (this.disabled || this.isPending) {
            return Promise.reject();
        }
        return this.pending().then((function() {
            this.emit(EVENTS.EXECUTE);
            return this.command();
        }).bind(this));
    };

    MenuItem.prototype.pending = function() {
        this.isPending = true;
        this.emit(EVENTS.PENDING_START);
        this.rootEl.classList.add(CSS_MODIFIERS.PENDING);
        return new Promise((function(resolve, reject) {
            this.once(EVENTS.PENDING_END, (function() {
                this.isPending = false;
                this.rootEl.classList.remove(CSS_MODIFIERS.PENDING);
                resolve();
            }).bind(this));
        }).bind(this));
    };

    MenuItem.prototype.enable = function() {
        this.disabled = (arguments[0] === false);
        this.rootEl.classList[this.disabled ? 'remove' : 'add'](CSS_MODIFIERS.DISABLED);
        this.emit(this.disabled ? EVENTS.DISABLE : EVENTS.ENABLE);
        return this;
    };

    MenuItem.prototype.disable = function() {
        return this.enable(false);
    };

    MenuItem.prototype.focus = function() {
        this.isFocused = (arguments[0] !== false);
        this.rootEl.classList[this.isFocused ? 'remove' : 'add'](CSS_MODIFIERS.FOCUSED);
        this.emit(this.isFocused ? EVENTS.FOCUS : EVENTS.BLUR);
        return this;
    };

    MenuItem.prototype.blur = function() {
        return this.focus(false);
    };

    return MenuItem;

});