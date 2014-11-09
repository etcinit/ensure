"use strict";

var ensure = require('../../ensure'),

    // A test function
    myTestFunction = function (arg1, arg2) {
        return arg1 && arg2;
    };

describe('ensure', function () {
    // Make sure we set enforce back on after each test
    afterEach(function (done) {
        ensure.enforce = true;
        done();
    });

    describe('#shield', function () {
        it('should wrap around a function', function () {
            var myFunction = function () {
                return true;
            },
                myWrappedFunction;

            myWrappedFunction = ensure.shield([], Boolean, myFunction);

            myWrappedFunction.should.be.instanceOf(Function);
        });

        it('should type check its own arguments', function () {
            (function () {
                ensure.shield({}, null, null, null);
            }).should.throw();
        });

        it('should type check arguments', function () {
            var myWrappedFunction = ensure.shield([Boolean, Boolean], Boolean, myTestFunction);

            (function (){
                myWrappedFunction(true, false);
            }).should.not.throw();

            (function (){
                myWrappedFunction(true, []);
            }).should.throw();
        });

        it('should type check return values', function () {
            var myWrappedFunction = ensure.shield([Boolean], Boolean, function (arg1) {
                if (arg1) {
                    return true;
                }

                return 8923;
            });

            (function (){
                myWrappedFunction(true);
            }).should.not.throw();

            (function (){
                myWrappedFunction(false);
            }).should.throw();
        });

        it('should fail on argument number mismatch', function () {
            var myWrappedFunction = ensure.shield([], Boolean, function () {
                return true;
            });

            (function (){
                myWrappedFunction();
            }).should.not.throw();

            (function (){
                myWrappedFunction(false);
            }).should.throw();
        });

        it('should not fail when a return value is not expected', function () {
            var myWrappedFunction = ensure.shield([], undefined, function () {
                return;
            });

            (function (){
                myWrappedFunction();
            }).should.not.throw();
        });

        it('should fail when a return value is not expected but it is provided', function () {
            var myWrappedFunction = ensure.shield([], undefined, function () {
                return true;
            });

            (function (){
                myWrappedFunction();
            }).should.throw();
        });

        it('should not type check arguments when enforce if off', function () {
            ensure.enforce = false;

            var myWrappedFunction = ensure.shield([Boolean, Boolean], Boolean, myTestFunction);

            (function (){
                myWrappedFunction(true, false);
            }).should.not.throw();

            (function (){
                myWrappedFunction(true, []);
            }).should.not.throw();
        });

        it('should not type check return values if enforce is off', function () {
            ensure.enforce = false;

            var myWrappedFunction = ensure.shield([Boolean], Boolean, function (arg1) {
                if (arg1) {
                    return true;
                }

                return 8923;
            });

            (function (){
                myWrappedFunction(true);
            }).should.not.throw();

            (function (){
                myWrappedFunction(false);
            }).should.not.throw();
        });
    });
});