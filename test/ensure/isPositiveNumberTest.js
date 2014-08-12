"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    describe('isPositiveNumber', function () {
        it('should return true if it is above 0', function () {
            ensure.isPositiveNumber(2).should.be.true;
        });

        it('should return false if it is below 0', function () {
            ensure.isPositiveNumber(-20).should.be.false;
        });

        it('should return false if it is not a number', function () {
            ensure.isPositiveNumber([1, 3]).should.be.false;
        });
    });

    describe('isNotPositiveNumber', function () {
        it('should return false if it is above', function () {
            ensure.isNotPositiveNumber(2).should.be.false;
        });

        it('should return true if it is below 0', function () {
            ensure.isNotPositiveNumber(-20).should.be.true;
        });

        it('should return true if it is not a number', function () {
            ensure.isNotPositiveNumber([1, 4]).should.be.true;
        });
    });
});