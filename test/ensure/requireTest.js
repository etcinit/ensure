"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
    describe('#require', function () {
        it('should throw an error if the variable is not defined', function () {
            (function () {
                ensure.require();
            }).should.throw();

            (function () {
                ensure.require(undefined);
            }).should.throw();
        });

        it('should throw an error if the variable is null', function () {
            (function () {
                ensure.require(null);
            }).should.throw();
        });

        it('should throw an error if the variable is an empty string', function () {
            (function () {
                ensure.require('');
            }).should.throw();
        });

        it('should not thrown an error if the variable is correctly defined', function () {
            (function () {
                ensure.require('hello');
            }).should.not.throw();

            (function () {
                ensure.require(false);
            }).should.not.throw();

            (function () {
                ensure.require(new Object());
            }).should.not.throw();
        });
    });
});