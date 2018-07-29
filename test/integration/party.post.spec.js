'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Party } = require(path.join(__dirname, '..', '..'));

describe('Party', function () {

  before(function (done) {
    Party.remove(done);
  });

  describe('static post', function () {

    let party;

    it('should be able to post', function (done) {

      party = Party.fake();

      Party
        .post(party, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(party._id);
          expect(created.name).to.eql(party.name);
          done(error, created);
        });
    });

  });

  describe('instance post', function () {

    let party;

    it('should be able to post', function (done) {

      party = Party.fake();

      party
        .post(function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(party._id);
          expect(created.name).to.eql(party.name);
          done(error, created);
        });
    });

  });

  after(function (done) {
    Party.remove(done);
  });

});
