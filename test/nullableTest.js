"use strict";

var ensure = require('../build/ensure.js'),
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

    it('should set value if provided in constructor', function () {
        var numArray = [1, 2, 3],
            NullableArray = new NullableInstance(Array, numArray);

        NullableArray.getValue().should.be.equal(numArray);
    });

    describe('#setValue', function () {
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

    describe('#isNull', function () {
        it('should return true when value is null', function () {
            var NullableArray = new NullableInstance(Array);

            NullableArray.isNull().should.be.true;

            NullableArray.setValue([1, 2, 3]);

            NullableArray.isNull().should.be.false;
        });
    });

    describe('#getType', function () {
        it('should return the type specified in the ocnstructor', function () {
            var NullableArray = new NullableInstance(Array);

            NullableArray.getType().should.be.equal(Array);
        });
    });

    describe('#getValue', function () {
        it('should return the type specified in the ocnstructor', function () {
            var numArray = [1, 2, 3],
                NullableArray = new NullableInstance(Array, numArray);

            NullableArray.getValue().should.be.equal(numArray);
        });
    });
});
