"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    describe('isInRange', function () {
        it('should return true if it is in the range', function () {
            ensure.isInRange(2, -5, 4).should.be.true;
        });

        it('should return false if it is below the range', function () {
            ensure.isInRange(-20, -5, 4).should.be.false;
        });

        it('should return false if it is above the range', function () {
            ensure.isInRange(20, -5, 4).should.be.false;
        });

        it('should return false if it is above max', function () {
            ensure.isInRange(20, null, 3).should.be.false;
        })

        it('should return false if it is below max', function () {
            ensure.isInRange(2, null, 3).should.be.true;
        })
    });

    describe('isInNotRange', function () {
        it('should return false if it is in the range', function () {
            ensure.isNotInRange(2, -5, 4).should.be.false;
        });

        it('should return true if it is below the range', function () {
            ensure.isNotInRange(-20, -5, 4).should.be.true;
        });

        it('should return true if it is above the range', function () {
            ensure.isNotInRange(20, -5, 4).should.be.true;
        });
    });
});