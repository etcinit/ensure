"use strict";

var ensure = require('../ensure.js'),
    Nullable = ensure.Nullable,
    NullableInstance = ensure.NullableInstance;

describe('Nullable', function () {
    it('should should construct an instance of a NullableInstance', function () {
        var NullableArray = Nullable(Array);

        NullableArray.should.be.instanceOf(NullableInstance);
    });

    it('should fail if we do not provide a type', function () {
        (function () {
            Nullable();
        }).should.throw();
    });
});

describe('NullableInstance', function () {
    it('should fail if we do not use new', function () {
        (function () {
            NullableInstance(Array);
        }).should.throw();
    });

    it('should allow null or type as value', function () {
        var NullableArray = new NullableInstance(Array);

        (function () {
            NullableArray.setValue([]);
        }).should.not.throw();

        (function () {
            NullableArray.setValue(null);
        }).should.not.throw();
    });

    it('should not allow other types as value', function () {
        var NullableArray = new NullableInstance(Array);

        (function () {
            NullableArray.setValue('hi');
        }).should.throw();

        (function () {
            NullableArray.setValue(undefined);
        }).should.throw();
    });
});