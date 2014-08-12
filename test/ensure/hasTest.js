"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    // Test object
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

    describe('#has', function () {
        it('should not throw an error if the object has a member of the specified name', function () {
            (function () {
                ensure.has(myObj, 'myString');
            }).should.not.throw();
        });

        it('should throw an error if the object does not have the specified member', function () {
            (function () {
                ensure.has(myObj, 'myFictionalString');
            }).should.throw();
        });

        it('should throw an error if the object is undefined', function () {
            (function () {
                ensure.has(undefined, 'myFictionalString');
            }).should.throw();
        });
    });

    describe('#hasFunction', function () {
        it('should not throw an error if it is a member function', function () {
            (function () {
                ensure.hasFunction(myObj, 'myFunction');
            }).should.not.throw();
        });

        it('should throw an error if it is not a member function', function () {
            (function () {
                ensure.hasFunction(myObj, 'myFunctionNot');
            }).should.throw();
        });
    });

    describe('#hasString', function () {
        it('should not throw an error if it is a string', function () {
            (function () {
                ensure.hasString(myObj, 'myString');
            }).should.not.throw();
        });

        it('should throw an error if it is not a string', function () {
            (function () {
                ensure.hasString(myObj, 'myStringNot');
            }).should.throw();
        });
    });

    describe('#hasNumber', function () {
        it('should not throw an error if it is a number', function () {
            (function () {
                ensure.hasNumber(myObj, 'myNumber');
            }).should.not.throw();
        });

        it('should throw an error if it is not a number', function () {
            (function () {
                ensure.hasNumber(myObj, 'myNumberNot');
            }).should.throw();
        });
    });

    describe('#hasObject', function () {
        it('should not throw an error if it is a object', function () {
            (function () {
                ensure.hasObject(myObj, 'mySubObj');
            }).should.not.throw();
        });

        it('should throw an error if it is not a object', function () {
            (function () {
                ensure.hasObject(myObj, 'mySubObjNot');
            }).should.throw();
        });
    });
});