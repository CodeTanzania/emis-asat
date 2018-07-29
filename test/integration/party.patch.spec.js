'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Party } = require(path.join(__dirname, '..', '..'));

describe('Party', function () {

  before(function (done) {
    Party.remove(done);
  });

  describe('static patch', function () {

    let party;

    before(function (done) {
      const fake = Party.fake();
      fake
        .post(function (error, created) {
          party = created;
          done(error, created);
        });
    });

    it('should be able to patch', function (done) {

      party = party.fakeOnly('name');

      Party
        .patch(party._id, party, function (error,
          updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(party._id);
          expect(updated.name).to.eql(party.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {

      const fake = Party.fake();

      Party
        .patch(fake._id, fake, function (error, updated) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance patch', function () {

    let party;

    before(function (done) {
      const fake = Party.fake();
      fake
        .post(function (error, created) {
          party = created;
          done(error, created);
        });
    });

    it('should be able to patch', function (done) {
      party = party.fakeOnly('name');

      party
        .patch(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(party._id);
          expect(updated.name).to.eql(party.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {
      party
        .patch(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(party._id);
          done();
        });
    });

  });

  after(function (done) {
    Party.remove(done);
  });

});
