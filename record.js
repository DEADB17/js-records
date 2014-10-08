/*jshint node:true*/

'use strict';

module.exports = function (/*fields*/) {
    var fields = Array.prototype.slice.call(arguments);
    var make = function make(/*fvals*/) {
        var i = 0;
        var r = {};
        var n = arguments.length < fields.length ? arguments.length : fields.length;
        r.constructor = make;
        while (i < n) {
            r[fields[i]] = arguments[i];
            i += 1;
        }
        return r;
    };
    var mod = {
        make: make,
        is: function (r) { return r.constructor === make; },
    };
    var i = 0;
    var n = fields.length;
    var f;
    while (i < n) {
        f = fields[i];
        mod[f] = (function (f) {
            return function (r, newVal) {
                var val = r[f];
                var type = typeof(newVal);
                if (type !== 'undefined') {
                    if (type === 'function') {
                        return newVal(val, f, r, mod);
                    } else {
                        r[f] = newVal;
                        return r;
                    }
                } else {
                    return r[f];
                }
            };
        }(f));
        i += 1;
    }
    return mod;
};
