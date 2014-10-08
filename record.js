/*jshint node:true*/

'use strict';

module.exports = function makeRecordType() {
    var klass = {};
    var make;
    klass.is = function is(instance) { return instance.make === make; };
    klass.make = make = function make(/*values*/) {
        var values = Array.prototype.slice.call(arguments);
        return {
            make: make,
            get: function get(fn) {
                return fn.apply(undefined, [klass, this].concat(values));
            }
        };
    };
    return klass;
};
