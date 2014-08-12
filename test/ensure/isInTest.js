"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    describe('isIn', function () {
        it('should return true if it is in the array', function () {
            var testArray = [1, 2, 3, 4, 5];

            ensure.isIn(4, testArray).should.be.true;
        });

        it('should return false if it is not in the array', function () {
            var testArray = [1, 2, 3, 4, 5];

            ensure.isIn(6, testArray).should.be.false;
        });
    });
});