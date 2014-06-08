var ensure = require('../ensure.js');

/**
 * Test the isNewThis function
 *
 * @param test
 */
exports.testIsNewThis = function (test) {
    test.expect(2);

    var myObject = function () {
        test.equal(ensure.isNewThis(myObject, this), true, 'isNewThis should return true when an constructor is called using new');
    };

    var myFunction = function () {
        test.equal(ensure.isNewThis(myFunction, this), false, 'isNewThis should return false when constructor is called as a function');
    };

    var result = new myObject();
    var result2 = myFunction();

    test.done();
};

/**
 * Perform the same check as above, but inside a different 'this' context
 *
 * @param test
 */
exports.testIsNewThisInObject = function (test) {
    test.expect(2);

    var myParentObject = function () {

    };

    myParentObject.prototype.someFunction = function () {
        var myObject = function () {
            test.equal(ensure.isNewThis(myObject, this), true, 'isNewThis should return true when an constructor is called using new');
        };

        var myFunction = function () {
            test.equal(ensure.isNewThis(myFunction, this), false, 'isNewThis should return false when constructor is called as a function');
        };

        var result = new myObject();
        var result2 = myFunction();
    };

    var parentInstance = new myParentObject();
    parentInstance.someFunction();

    test.done();
};

/**
 * Test the requireIsNewThis function which wraps around isNewThis
 *
 * @param test
 */
exports.testRequireIsNewThis = function (test) {
    test.expect(2);

    var myObject = function () {
        ensure.requireIsNewThis(myObject, this);
    };

    test.doesNotThrow(function () {
        var instance = new myObject();
    });

    test.throws(function () {
        var instance = myObject();
    });

    test.done();
};