"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    describe('#one', function () {
        it('should return null if no options given', function () {
            (ensure.one() === null).should.be.true;
        });

        it('should return null if all options are null or undefined', function () {
            (ensure.one(null) === null).should.be.true;

            (ensure.one(null, undefined) === null).should.be.true;

            (ensure.one(undefined) === null).should.be.true;

            (ensure.one(undefined, null) === null).should.be.true;
        });

        it('should return the first option that is not null or undefined', function () {
            (ensure.one(null, 'hi', undefined) === 'hi').should.be.true;

            (ensure.one('hello', 'hi', undefined) === 'hello').should.be.true;

            (ensure.one(null, null, undefined, 'wow') === 'wow').should.be.true;

            (ensure.one(null, undefined, 1337) === 1337).should.be.true;
        });
    });
});