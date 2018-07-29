'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const Role =
  require(path.join(__dirname, '..', '..', 'lib', 'role.model'));


describe('Role', function () {


  describe('Validations', function () {
    //TODO
  });


  describe('Instance', function () {

    it('`preValidate` should be a function', function () {
      const role = Role.fake();
      expect(role.preValidate).to.exist;
      expect(role.preValidate).to.be.a('function');
      expect(role.preValidate.length).to.be.equal(1);
      expect(role.preValidate.name).to.be.equal('preValidate');
    });

  });


  describe('Hooks', function () {
    //TODO
  });


  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Role.MODEL_NAME).to.exist;
      expect(Role.MODEL_NAME).to.be.equal('Role');
    });

  });


});
