'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Party } = require(path.join(__dirname, '..', '..'));

describe('Party', function () {

  before(function (done) {
    Party.remove(done);
  });

  describe('static delete', function () {

    let party;

    before(function (done) {
      const fake = Party.fake();
      fake
        .post(function (error, created) {
          party = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      Party
        .del(party._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(party._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      Party
        .del(party._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let party;

    before(function (done) {
      const fake = Party.fake();
      fake
        .post(function (error, created) {
          party = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      party
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(party._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      party
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(party._id);
          done();
        });
    });

  });

  after(function (done) {
    Party.remove(done);
  });

});
