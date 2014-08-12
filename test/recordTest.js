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

        try {
            var testType = new EnsureRecord();
        } catch (error) {
            thrown = true;
        }

        thrown.should.be.true;

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
});