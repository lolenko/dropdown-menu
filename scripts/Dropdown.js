define(['utils', 'EventEmitter'], function(utils, EventEmitter) {

    'use strict';

    var CSS_MODIFIERS = {
        EXPANDED: 'dropdown_expanded'
    };

    var EVENTS = {
        EXPAND: 'expand',
        HIDE: 'hide'
    };

    var Dropdown = function(params) {
        this.rootEl = utils.tmpl(Dropdown.TEMPLATE);
        this.params = utils.extend({
            relatedTarget: null,
            offset: 0,
            position: 'auto'
        }, params || {});
        this.isExpanded = false;
        this.position();
    };

    utils.inherits(Dropdown, EventEmitter);

    Dropdown.CSS_MODIFIERS = CSS_MODIFIERS;
    Dropdown.EVENTS = EVENTS;
    Dropdown.TEMPLATE = '<div class="dropdown"></div>'

    Dropdown.prototype.expand = function() {
        this.isExpanded = (arguments[0] !== false);
        this.isExpanded && this.position();
        this.rootEl.classList[this.isExpanded ? 'add' : 'remove'](CSS_MODIFIERS.EXPANDED);
        this.emit(this.isExpanded ? EVENTS.EXPAND : EVENTS.HIDE);
        return this;
    };

    Dropdown.prototype.close = function() {
        this.expand(false);
    };

    Dropdown.prototype.position = function() {
        //TODO: спозиционировать на основе position и offset
        if (this.params.position === 'horizontal') {
            this.rootEl.classList.add('dropdown_position_right');
        }
    };

    Dropdown.prototype.append = function(item) {
        this.rootEl.appendChild(item.rootEl);
    };

    return Dropdown;

});