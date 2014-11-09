"use strict";

var ensure = require('../ensure.js'),

    Nothing = ensure.Nothing;

describe('Nothing', function () {
    it('should be a constructor function', function () {
        var instance = new Nothing();

        instance.should.be.instanceOf(Nothing);
    });
});