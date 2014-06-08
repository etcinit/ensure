var ensure = require('../ensure.js');

exports.testRequire = function (test) {
    test.expect(4);

    var myVar;

    test.throws(function () {
        ensure.require(myVar);
    });

    myVar = null;

    test.throws(function () {
        ensure.require(myVar);
    });

    myVar = '';

    test.throws(function () {
        ensure.require(myVar);
    });

    myVar = 'hello';

    test.doesNotThrow(function () {
        ensure.require(myVar);
    });

    test.done();
};