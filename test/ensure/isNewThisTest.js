"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    describe('#isNewThis', function () {
        it('should return false if the function is called in the global scope', function () {
            var myObject = function () {
                ensure.isNewThis(myObject, this).should.be.false;
            };

            myObject.bind(root)();
        });

        it('should return true if the constructor has a new context', function () {
            var myObject = function () {
                ensure.isNewThis(myObject, this).should.be.true;
            };

            var result = new myObject();
        });

        it('should return false if used within a function, not a constructor', function () {
            var myFunction = function () {
                ensure.isNewThis(myFunction, this).should.be.false;
            };

            var result2 = myFunction();
        });

        it('should be true if the constructor has a new context (inside other objects)', function () {
            var myParentObject = function () {

            };

            myParentObject.prototype.someFunction = function () {
                var myObject = function () {
                    ensure.isNewThis(myObject, this).should.be.true;
                };

                var result = new myObject();
            };

            var parentInstance = new myParentObject();
            parentInstance.someFunction();
        });

        it('should be false if the constructor does not have a new context (inside other objects)', function () {
            var myParentObject = function () {

            };

            myParentObject.prototype.someFunction = function () {
                var myFunction = function () {
                    ensure.isNewThis(myFunction, this).should.be.false;
                };

                var result2 = myFunction();
            };

            var parentInstance = new myParentObject();
            parentInstance.someFunction();
        });
    });

    describe('#requireIsNewThis', function () {
        it('should return true if the constructor has a new context', function () {
            var myObject = function () {
                var self = this;

                (function () {
                    ensure.requireIsNewThis(myObject, self);
                }).should.not.throw();
            };

            var result = new myObject();
        });

        it('should throw an error if used within a function, not a constructor', function () {
            var myFunction = function () {
                var self = this;

                (function () {
                    ensure.requireIsNewThis(myFunction, self)
                }).should.throw();
            };

            var result2 = myFunction();
        });
    });
});