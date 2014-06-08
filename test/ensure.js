var ensure = require('../ensure.js');

exports.testEnsure = function (test) {
    test.expect(11);

    // String
    test.doesNotThrow(function () {
        ensure('hi', String);
    }, Error, 'String should be String');

    test.doesNotThrow(function () {
        ensure(new String('hi'), String);
    });

    test.doesNotThrow(function () {
        ensure('9098' + 56846, String);
    });

    // Boolean
    test.doesNotThrow(function () {
        ensure(true, Boolean);
    });

    test.doesNotThrow(function () {
        ensure(false, Boolean);
    });

    test.doesNotThrow(function () {
        ensure(45 > 0, Boolean);
    });

    // Number
    test.doesNotThrow(function () {
        ensure(45, Number);
    });

    test.doesNotThrow(function () {
        ensure(45.65, Number);
    });

    test.doesNotThrow(function () {
        ensure(-45, Number);
    });

    test.doesNotThrow(function () {
        ensure(-45.894, Number);
    });

    test.doesNotThrow(function () {
        ensure(new Number(45), Number);
    });

    test.done();
};

exports.testEnsureErrors = function (test) {
    test.expect(12);

    // String
    test.throws(function () {
        ensure(9090, String);
    }, 'Numbers are not Strings');

    test.throws(function () {
        ensure(new Object(), String);
    }, 'Objects are not Strings');

    test.throws(function () {
        ensure(['hi', 90], String);
    }, Error, 'Arrays are not Strings');

    test.throws(function () {
        ensure({}, String);
    }, Error, 'Objects are not Strings');

    // Boolean
    test.throws(function () {
        ensure(9090, Boolean);
    });

    test.throws(function () {
        ensure(1, Boolean);
    });

    test.throws(function () {
        ensure(0, Boolean);
    });

    test.throws(function () {
        ensure('false', Boolean);
    });

    test.throws(function () {
        ensure('true', Boolean);
    });

    // Number
    test.throws(function () {
        ensure('true', Number);
    });

    test.throws(function () {
        ensure(true, Number);
    });

    test.throws(function () {
        ensure(new Object(), Number);
    });

    test.done();
};