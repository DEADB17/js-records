/*jshint node:true*/

'use strict';

module.exports = function (/*fields*/) {
    var fields = Array.prototype.slice.call(arguments);
    var make = function make(/*fvals*/) {
        var i = 0;
        var t = new Array(fields.length + 1);
        var n = arguments.length < fields.length ? arguments.length : fields.length;
        t[0] = make;
        while (i < n) {
            t[i + 1] = arguments[i];
            i += 1;
        }
        return t;
    };
    var mod = {
        make: make,
        is: function (t) { return t[0] === make; },
    };
    var i = 0;
    var n = fields.length;
    while (i < n) {
        mod[fields[i]] = (function (f) {
            return function (r, newVal) {
                var val = r[f];
                var type = typeof(newVal);
                if (type !== 'undefined') {
                    if (type === 'function') {
                        r[f] = newVal(val, fields[f - 1], r, mod);
                        return r;
                    } else {
                        r[f] = newVal;
                        return r;
                    }
                } else {
                    return r[f];
                }
            };
        }(i + 1));
        i += 1;
    }
    return mod;
};
