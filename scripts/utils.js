define(function() {

    'use strict';

    /**
     * Наследует ctor от superCtor
     *
     * @param {constructor} ctor - целевоей конструктор
     * @param {constructor} superCtor - наследуемый конструктор
     */

    var inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        var F = function() {};
        F.prototype = superCtor.prototype;
        ctor.prototype = new F();
        ctor.prototype.constructor = ctor;
    };

    var extend = function(){
        for (var i=1; i<arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    };

    var tmpl = function(tpl, data) {
        var re = /<%([^%>]+)?%>/g;
        var match;
        while(match = re.exec(tpl)) {
            tpl = tpl.replace(match[0], data[match[1]])
        }
        var div = document.createElement('div');
        div.innerHTML = tpl;
        return div.children[0];
    };

    return {
        inherits: inherits,
        extend: extend,
        tmpl: tmpl
    };

});