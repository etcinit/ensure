"use strict";

var ensure = require('../../ensure');

describe('ensure', function () {
   describe('#isEmpty', function () {
       it('should return true if the object is null', function () {
           ensure.isEmpty(null).should.be.true;
       });

       it('should return true if the object is undefined', function () {
           ensure.isEmpty(undefined).should.be.true;
       });

       it('should return true if the object is an empty string', function () {
           ensure.isEmpty('').should.be.true;
       });

       it('should return false if the object has a value', function () {
           ensure.isEmpty('hi').should.be.false;
       });
   });

   describe('#isNotEmpty', function () {
       it('should return false if the object is null', function () {
           ensure.isNotEmpty(null).should.be.false;
       });

       it('should return false if the object is undefined', function () {
           ensure.isNotEmpty(undefined).should.be.false;
       });

       it('should return false if the object is an empty string', function () {
           ensure.isNotEmpty('').should.be.false;
       });

       it('should return true if the object has a value', function () {
           ensure.isNotEmpty('hi').should.be.true;
       });
   });
});