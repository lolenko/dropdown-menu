define(['utils', 'EventEmitter'], function(utils, EventEmitter) {

    'use strict';

    var MenuItem = function(rootEl, params) {
        params = utils.extend({
            command: (function() { console.log('execute ', this); }).bind(this),
            activateOn: 'click'
        }, params);
        this.rootEl = rootEl;
        this.command = params.command;
        this.disabled = rootEl.classList.contains('menu-item_disabled');
        this.isPending = false;
        rootEl.addEventListener(params.activateOn, this.execute.bind(this), false);
        rootEl.addEventListener('webkitAnimationEnd', (function(e) {
            e.stopPropagation();
            if (e.animationName === 'menu-item-pending') {
                this.emit('pendingend', e);
            }
        }).bind(this), false);
    };

    utils.inherits(MenuItem, EventEmitter);

    MenuItem.prototype.execute = function(e) {
        e.stopPropagation();
        if (this.disabled || this.isPending) {
            return Promise.reject();
        }
        return this.pending().then((function() {
            this.emit('execute');
            return this.command();
        }).bind(this));
    };

    MenuItem.prototype.pending = function() {
        this.isPending = true;
        this.emit('pendingstart');
        this.rootEl.classList.add('menu-item_pending');
        return new Promise((function(resolve, reject) {
            this.once('pendingend', (function() {
                this.isPending = false;
                this.rootEl.classList.remove('menu-item_pending');
                resolve();
            }).bind(this));
        }).bind(this));
    };

    MenuItem.prototype.enable = function() {
        this.disabled = (arguments[0] === false);
        this.rootEl.classList[this.disabled ? 'remove' : 'add']('menu-item_disabled');
        return this;
    };

    MenuItem.prototype.disable = function() {
        return this.enable(false);
    };

    return MenuItem;

});