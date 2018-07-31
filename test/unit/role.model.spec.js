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

    it('should expose default role type as constant', function () {
      expect(Role.DEFAULT_ROLE_TYPE).to.exist;
      expect(Role.DEFAULT_ROLE_TYPE).to.be.a('string');
      expect(Role.DEFAULT_ROLE_TYPE).to.not.be.empty;
    });

    it('should expose acceptable role types as constant', function () {
      expect(Role.ROLE_TYPES).to.exist;
      expect(Role.ROLE_TYPES).to.be.an('array');
      expect(Role.ROLE_TYPES).to.have.length.at.least(1);
    });

  });


});
