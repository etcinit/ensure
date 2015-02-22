"use strict";

var ensure = require('../../build/ensure');

describe('ensure', function () {
    // Make sure we set enforce back on after each test
    afterEach(function (done) {
        ensure.enforce = true;
        done();
    });

    describe('#enforce', function () {
        it('should not throw an error if enforce is off', function () {
            (function () {
                ensure.enforce = false;

                ensure([], String);
            }).should.not.throw();
        });

        it('should return true even if the type is invalid', function () {
            ensure.enforce = false;

            ensure([], String).should.be.true;
        });

        it('should be overridden when soft is set to false', function () {
            ensure.enforce = false;

            (function () {
                ensure.enforce = false;

                ensure([], String, false);
            }).should.throw();
        });
    });
});
