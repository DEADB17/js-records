/*jshint node:true*/

'use strict';

var test = require('tape');
var makeTuple = require('../tuple');


test('class API', function (t) {
  t.plan(4);

  var klass = makeTuple();
  t.ok('make' in klass, 'has make');
  t.equal(typeof klass.make, 'function', 'make is function');
  t.ok('is' in klass, 'has is');
  t.equal(typeof klass.is, 'function', 'is is function');
});

test('instance API', function (t) {
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
