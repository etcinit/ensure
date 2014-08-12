"use strict";

var ensure = require('../ensure');

describe('ensure', function () {
    it('should not throw errors if the type matches', function () {
        // String
        (function () {
            ensure('hi', String);
        }).should.not.throw();

        (function () {
            ensure(new String('hi'), String);
        }).should.not.throw();

        (function () {
            ensure('9098' + 56846, String);
        }).should.not.throw();

        // Boolean
        (function () {
            ensure(true, Boolean);
        }).should.not.throw();

        (function () {
            ensure(false, Boolean);
        }).should.not.throw();

        (function () {
            ensure(45 > 0, Boolean);
        }).should.not.throw();

        // Number
        (function () {
            ensure(45, Number);
        }).should.not.throw();

        (function () {
            ensure(45.45, Number);
        }).should.not.throw();

        (function () {
            ensure(-45, Number);
        }).should.not.throw();

        (function () {
            ensure(-45.45, Number);
        }).should.not.throw();

        (function () {
            ensure(new Number(45), Number);
        }).should.not.throw();
    });

    it('should throw errors if the type does not match', function () {
        // String
        (function () {
            ensure(45, String);
        }).should.throw();

        (function () {
            ensure(new Object(), String);
        }).should.throw();

        (function () {
            ensure(['hi', 90], String);
        }).should.throw();

        (function () {
            ensure([], String);
        }).should.throw();

        // Boolean
        (function () {
            ensure(1, Boolean);
        }).should.throw();

        (function () {
            ensure(0, Boolean);
        }).should.throw();

        (function () {
            ensure('true', Boolean);
        }).should.throw();

        (function () {
            ensure('false', Boolean);
        }).should.throw();

        // Number
        (function () {
            ensure('true', Number);
        }).should.throw();

        (function () {
            ensure(true, Number);
        }).should.throw();

        (function () {
            ensure(new Object(), Number);
        }).should.throw();
    });
});