'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const Permission =
  require(path.join(__dirname, '..', '..', 'lib', 'permission.model'));


describe('Permission', function () {


  describe('Validations', function () {
    //TODO
  });


  describe('Instance', function () {

    it('`preValidate` should be a function', function () {
      const permission = Permission.fake();
      expect(permission.preValidate).to.exist;
      expect(permission.preValidate).to.be.a('function');
      expect(permission.preValidate.length).to.be.equal(1);
      expect(permission.preValidate.name).to.be.equal('preValidate');
    });

  });


  describe('Hooks', function () {
    //TODO
  });


  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Permission.MODEL_NAME).to.exist;
      expect(Permission.MODEL_NAME).to.be.equal('Permission');
    });

  });


});
