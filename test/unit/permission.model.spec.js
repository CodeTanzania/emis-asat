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
    describe('resource', function () {

      it('should check for required', function (done) {
        const permission = new Permission();
        permission.validate(function (error) {
          expect(error.errors.resource).to.exist;
          expect(error.errors.resource.value).to.be.undefined;
          expect(error.errors.resource.kind).to.be.equal('required');
          done();
        });
      });

      it('should check for validity', function (done) {
        const permission = Permission.fake();
        permission.validate(function (error) {
          expect(error).to.not.exist;
          done();
        });
      });

      it('should check for validity', function (done) {
        const permission = Permission.fake();
        permission.resource = 1234;
        permission.validate(function (error) {
          expect(error).to.not.exist;
          done();
        });
      });

    });

    describe('Actions', function () {

      it('should check actiion error validity', function (done) {
        const permission = new Permission({
            resource:null,
            action:null
        });

        permission.validate(function (error) {
          expect(error.errors.action).to.exist;
          done();
        });
      });

      it('should check the validity ', function (done) {
        const actions = Permission.fake();
        actions.validate(function (error) {
          expect(error).to.not.exist;
          done();
        });
      });
    });

    describe('Wildcard', function () {

      it('should check for wildcard error validation', function (done) {
        const wildcard = {
          wildcard: null,
          resource: null,
          action:null
        };
        const permission = new Permission(wildcard);
        permission.validate(function (error) {
          expect(error).to.exist;
          done();
        });
      });

      it('should check for wildcard validity', function (done) {
        const permission =  Permission.fake();
        permission.validate(function (error) {
          expect(error).to.not.exist;
          done();
        });
      });
    });

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
