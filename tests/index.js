/*jshint node:true*/

'use strict';

var test = require('tape');


var makeTuple = require('../tuple');

test('tuple class API', function (t) {
    t.plan(4);

    var klass = makeTuple();
    t.ok('make' in klass, 'has make');
    t.equal(typeof klass.make, 'function', 'make is function');
    t.ok('is' in klass, 'has is');
    t.equal(typeof klass.is, 'function', 'is is function');
});

test('tuple instance API', function (t) {
    t.plan(12);

    var klass = makeTuple('val');
    t.ok('val' in klass, 'has val');
    t.equal(typeof klass.val, 'function', 'val is function');
    t.equal(klass.val.length, 2, 'val is a function of 2 arguments');

    var instance = klass.make('a value');
    t.ok(klass.is(instance), 'instance equality');
    t.equal(klass.val(instance), 'a value', 'getter');
    t.equal(klass.val(klass.val(instance, 'another value')), 'another value', 'setter with value');
    t.equal(klass.val(klass.val(instance, function (value, field, instanceArg, klassArg) {
        t.equal(value, 'another value', 'value argument');
        t.equal(field, 'val', 'field argument');
        t.equal(instanceArg, instance, 'instance argument');
        t.equal(klassArg, klass, 'class argument');
        t.equal(klassArg[field](instanceArg), value, 'all arguments');
        return 'yet another value';
    })), 'yet another value', 'setter with function');
});



var makeStruct = require('../struct');

test('struct class API', function (t) {
    t.plan(4);

    var klass = makeStruct();
    t.ok('make' in klass, 'has make');
    t.equal(typeof klass.make, 'function', 'make is function');
    t.ok('is' in klass, 'has is');
    t.equal(typeof klass.is, 'function', 'is is function');
});

test('struct instance API', function (t) {
    t.plan(12);

    var klass = makeStruct('val');
    t.ok('val' in klass, 'has val');
    t.equal(typeof klass.val, 'function', 'val is function');
    t.equal(klass.val.length, 2, 'val is a function of 2 arguments');

    var instance = klass.make('a value');
    t.ok(klass.is(instance), 'instance equality');
    t.equal(klass.val(instance), 'a value', 'getter');
    t.equal(klass.val(klass.val(instance, 'another value')), 'another value', 'setter with value');
    t.equal(klass.val(klass.val(instance, function (value, field, instanceArg, klassArg) {
        t.equal(value, 'another value', 'value argument');
        t.equal(field, 'val', 'field argument');
        t.equal(instanceArg, instance, 'instance argument');
        t.equal(klassArg, klass, 'class argument');
        t.equal(klassArg[field](instanceArg), value, 'all arguments');
        return 'yet another value';
    })), 'yet another value', 'setter with function');
});



var makeRecordType = require('../record');

test('record class API', function (t) {
    t.plan(4);

    var klass = makeRecordType();
    t.ok('make' in klass, 'has make');
    t.equal(typeof klass.make, 'function', 'make is function');
    t.ok('is' in klass, 'has is');
    t.equal(typeof klass.is, 'function', 'is is function');
});

test('record instance API', function (t) {
    t.plan(11);

    var klass = makeRecordType();
    var instance = klass.make('a value');
    t.ok('make' in instance, 'has make');
    t.equal(typeof instance.make, 'function', 'make is function');
    t.ok('get' in instance, 'has get');
    t.equal(typeof instance.get, 'function', 'get is function');

    t.ok(klass.is(instance), 'instance equality');
    t.equal(instance.get(function (klassArg, instanceArg, val) {
        return val;
    }), 'a value', 'get');
    var instance2 = instance.get(function (klassArg, instanceArg) {
        return instanceArg.make('another value');
    });
    t.equal(instance2.get(function (_k, _i, val) { return val; }), 'another value', 'immutable set');
    var instance3 = klass.make(['a val']);
    var instance4 = instance3.get(function (klassArg, instanceArg, val) {
        val[0] = 'yet another value';
        return instanceArg;
    });
    t.equal(instance4.get(function (_k, _i, val) { return val[0]; }), 'yet another value', 'mutable set');
    instance.get(function (klassArg, instanceArg, val) {
        t.equal(klassArg, klass, 'class argument');
        t.equal(instanceArg, instance, 'instance argument');
        t.equal(val, 'a value', 'value argument');
    });
});
