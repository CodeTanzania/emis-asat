'use strict';


/* dependencies */
const path = require('path');
const {
  expect
} = require('chai');


/* declarations */
const Party =
  require(path.join(__dirname, '..', '..', 'lib', 'party.model'));


describe('Party', function () {


  describe('Validations', function () {
    //TODO
    describe('Validate Name', function () {

      it('should be invalid if name is empty', function (done) {
        const party = new Party();

        party.validate(function (err) {
          expect(err.errors.name).to.exist;
          done();
        });
      });

      it('should be valid if name is provided', function (done) {
        const party = new Party({
          name: Party.fake()
        });

        party.validate(function (err) {
          expect(err.errors.name).to.not.exist;
          done();
        });
      });

    });

    describe('Validate phone', function () {
      it('should be invalid if name is empty', function (done) {
        const party = new Party();

        party.validate(function (err) {
          expect(err.errors.phone).to.exist;
          done();
        });
      });

      it('should be valid if phone is provided', function (done) {
        const party = new Party({
          phone: Party.fake()
        });

        party.validate(function (err) {
          expect(err.errors.phone).to.not.exist;
          done();
        });
      });
    });

    describe('Validate email', function () {
      it('should be invalid if email is empty', function (done) {
        const party = new Party();

        party.validate(function (err) {
          expect(err.errors.email).to.exist;
          done();
        });
      });

      it('should be valid if email is provided', function (done) {
        const party = new Party({
          email: Party.fake()
        });
        party.validate(function (err) {
          expect(err.errors.email).to.not.exist;
          done();
        });
      });
    });

  });


  describe('Instance', function () {

    it('`preValidate` should be a function', function () {
      const party = Party.fake();
      expect(party.preValidate).to.exist;
      expect(party.preValidate).to.be.a('function');
      expect(party.preValidate.length).to.be.equal(1);
      expect(party.preValidate.name).to.be.equal('preValidate');
    });

  });


  describe('Hooks', function () {
    //TODO
  });


  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Party.MODEL_NAME).to.exist;
      expect(Party.MODEL_NAME).to.be.equal('Party');
    });

    it('should expose default locale as constant', function () {
      expect(Party.DEFAULT_LOCALE).to.exist;
      expect(Party.DEFAULT_LOCALE).to.be.a('string');
      expect(Party.DEFAULT_LOCALE).to.not.be.empty;
    });

    it('should expose acceptable locales as constant', function () {
      expect(Party.LOCALES).to.exist;
      expect(Party.LOCALES).to.be.an('array');
      expect(Party.LOCALES).to.have.length.at.least(1);
    });

    it('should expose default party type as constant', function () {
      expect(Party.DEFAULT_PARTY_TYPE).to.exist;
      expect(Party.DEFAULT_PARTY_TYPE).to.be.a('string');
      expect(Party.DEFAULT_PARTY_TYPE).to.not.be.empty;
    });

    it('should expose acceptable party types as constant', function () {
      expect(Party.PARTY_TYPES).to.exist;
      expect(Party.PARTY_TYPES).to.be.an('array');
      expect(Party.PARTY_TYPES).to.have.length.at.least(1);
    });

    it('should expose acceptable disaster phases as constant', function () {
      expect(Party.DISASTER_PHASES).to.exist;
      expect(Party.DISASTER_PHASES).to.be.an('array');
      expect(Party.DISASTER_PHASES).to.have.length.at.least(1);
    });

    it('should expose default party owneship as constant', function () {
      expect(Party.DEFAULT_PARTY_OWNERSHIP).to.exist;
      expect(Party.DEFAULT_PARTY_OWNERSHIP).to.be.a('string');
      expect(Party.DEFAULT_PARTY_OWNERSHIP).to.not.be.empty;
    });

    it('should expose acceptable party ownership as constant', function () {
      expect(Party.PARTY_OWNERSHIP).to.exist;
      expect(Party.PARTY_OWNERSHIP).to.be.an('array');
      expect(Party.PARTY_OWNERSHIP).to.have.length.at.least(1);
    });

  });


});
