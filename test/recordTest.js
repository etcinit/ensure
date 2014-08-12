"use strict";

var ensure = require('../ensure.js'),
    EnsureRecord = ensure.EnsureRecord,
    EnsureRecordInstance = ensure.EnsureRecordInstance;

describe('EnsureRecord', function () {
    it('should be a constructor/factory that returns a function', function () {
        EnsureRecord.should.be.type('function');

        var testType = new EnsureRecord({});

        testType.should.be.type('function');

        testType.should.not.be.instanceOf(EnsureRecord);
    });

    it('generated functions should create instances of a record', function () {
        var testType = new EnsureRecord({});

        var instance = new testType({});

        instance.should.be.an.instanceOf(EnsureRecordInstance);

        instance.should.be.an.instanceOf(testType);

        instance.should.not.be.an.instanceOf(EnsureRecord);
    });

    it('should throw an error if the spec is invalid', function () {
        var thrown = false;

        (function () {
            var testType = new EnsureRecord();
        }).should.throw();

        try {
            thrown = false;

            var testType = new EnsureRecord(null);
        } catch (error) {
            thrown = true;
        }

        thrown.should.be.true;

        try {
            thrown = false;

            var testType = new EnsureRecord(undefined);
        } catch (error) {
            thrown = true;
        }

        thrown.should.be.true;
    });

    it('should throw an error if an instance\'s values are of the wrong type', function () {
        var testType = new EnsureRecord({ name: String }),

            instance,
            thrown = false;

        try {
            instance = new testType({ name: 1234 });
        } catch (err) {
            thrown = true;
        }

        thrown.should.be.true;
    });

    it('should not throw an error if an instance\'s values are of the right type', function () {
        var testType = new EnsureRecord({ name: String }),

            instance,
            thrown = false;

        try {
            instance = new testType({ name: "Bob" });
        } catch (err) {
            thrown = true;
        }

        thrown.should.be.false;
    });

    it('should throw an error if an instance setter gets the wrong value', function () {
        var testType = new EnsureRecord({ name: String }),

            thrown = false,
            instance = new testType({ name: "Bob" });

        try {
            instance.name = [];
        } catch (err) {
            thrown = true;
        }

        thrown.should.be.true;
    });

    it('should not throw an error if an instance setter gets the right value', function () {
        var testType = new EnsureRecord({ name: String }),

            thrown = false,
            instance = new testType({ name: "Bob" });

        try {
            instance.name = "Bobby";
        } catch (err) {
            thrown = true;
        }

        thrown.should.be.false;
    });

    it('getter should return value set by setter', function () {
        var testType = new EnsureRecord({ name: String }),

            thrown = false,
            instance = new testType({ name: "Bob" });

        instance.name = "Bobby";

        instance.name.should.equal("Bobby");
    });

    it('should ignore prototype inheritance in spec', function () {
        var specBase = { name: String },
            spec = { phone: Number },
            testType,
            instance;

        spec.prototype = specBase;

        testType = EnsureRecord(spec);

        instance = new testType({ name: "Bob", phone: 404 });

        instance.hasOwnProperty('name').should.be.false;

        instance.hasOwnProperty('phone').should.be.true;

        (function () {
            instance.name = 'Bobby';
        }).should.throw();
    });

    it('should work with multiple record properties', function () {
        var Person = new EnsureRecord({ firstName: String, lastName: String, age: Number }),

            instance = new Person({ firstName: "Bob", lastName: "Lulz", age: 20 });

        (function () {
            instance.firstName = 30;
        }).should.throw();

        (function () {
            instance.firstName = 'alex';
        }).should.not.throw();

        (function () {
            instance.lastName = 50;
        }).should.throw();

        (function () {
            instance.lastName = 'bob';
        }).should.not.throw();

        (function () {
            instance.age = {};
        }).should.throw();

        (function () {
            instance.age = 45;
        }).should.not.throw();
    });
});