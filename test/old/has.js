var ensure = require('../../ensure.js');

// Create a test object
var myObj = {
    myString: 'hi',
    myFunction: function () {
        return 'hi';
    },
    myNumber: 34,
    mySubObj: {
        mySubString: 'hello'
    }
};

exports.testHas = function (test) {
    test.expect(5);

    test.doesNotThrow(function () {
        ensure.has(myObj, 'myString');
    });

    test.doesNotThrow(function () {
        ensure.has(myObj, 'myFunction');
    });

    test.doesNotThrow(function () {
        ensure.has(myObj, 'myNumber');
    });

    test.doesNotThrow(function () {
        ensure.has(myObj, 'mySubObj');
    });

    test.throws(function () {
        ensure.has(myObj, 'lolnothere');
    });

    test.done();
};

exports.testHasFunction = function (test) {
    test.expect(2);

    test.doesNotThrow(function () {
        ensure.hasFunction(myObj, 'myFunction');
    });

    test.throws(function () {
        ensure.hasFunction(myObj, 'notMyFunction');
    });

    test.done();
};

exports.testHasString = function (test) {
    test.expect(2);

    test.doesNotThrow(function () {
        ensure.hasString(myObj, 'myString');
    });

    test.throws(function () {
        ensure.hasString(myObj, 'notMyString');
    });

    test.done();
};

exports.testHasNumber = function (test) {
    test.expect(2);

    test.doesNotThrow(function () {
        ensure.hasNumber(myObj, 'myNumber');
    });

    test.throws(function () {
        ensure.hasNumber(myObj, 'notMyNumber');
    });

    test.done();
};

exports.testHasObject = function (test) {
    test.expect(2);

    test.doesNotThrow(function () {
        ensure.hasObject(myObj, 'mySubObj');
    });

    test.throws(function () {
        ensure.hasObject(myObj, 'notMySubObj');
    });

    test.done();
};