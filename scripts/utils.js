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

    return {
        inherits: inherits,
        extend: extend
    };

});