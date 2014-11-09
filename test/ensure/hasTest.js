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
                ensure.has(myObj, 'myString', undefined, false);
            }).should.not.throw();
        });

        it('should throw an error if the object does not have the specified member', function () {
            (function () {
                ensure.has(myObj, 'myFictionalString', undefined, false);
            }).should.throw();
        });

        it('should throw an error if the object is undefined', function () {
            (function () {
                ensure.has(undefined, 'myFictionalString', undefined, false);
            }).should.throw();
        });

        it('should return true if the object has a member of the specified name', function () {
            ensure.has(myObj, 'myString', undefined).should.be.true;
        });

        it('should return false if the object does not have the specified member', function () {
            ensure.has(myObj, 'myFictionalString', undefined).should.be.false;
        });

        it('should return false if the object is undefined', function () {
            ensure.has(undefined, 'myFictionalString').should.be.false;
        });
    });

    describe('#hasFunction', function () {
        it('should not throw an error if it is a member function', function () {
            (function () {
                ensure.hasFunction(myObj, 'myFunction', false);
            }).should.not.throw();
        });

        it('should throw an error if it is not a member function', function () {
            (function () {
                ensure.hasFunction(myObj, 'myFunctionNot', false);
            }).should.throw();
        });
    });

    describe('#hasString', function () {
        it('should not throw an error if it is a string', function () {
            (function () {
                ensure.hasString(myObj, 'myString', false);
            }).should.not.throw();
        });

        it('should throw an error if it is not a string', function () {
            (function () {
                ensure.hasString(myObj, 'myStringNot', false);
            }).should.throw();
        });
    });

    describe('#hasNumber', function () {
        it('should not throw an error if it is a number', function () {
            (function () {
                ensure.hasNumber(myObj, 'myNumber', false);
            }).should.not.throw();
        });

        it('should throw an error if it is not a number', function () {
            (function () {
                ensure.hasNumber(myObj, 'myNumberNot', false);
            }).should.throw();
        });
    });

    describe('#hasObject', function () {
        it('should not throw an error if it is a object', function () {
            (function () {
                ensure.hasObject(myObj, 'mySubObj', false);
            }).should.not.throw();
        });

        it('should throw an error if it is not a object', function () {
            (function () {
                ensure.hasObject(myObj, 'mySubObjNot', false);
            }).should.throw();
        });
    });
});