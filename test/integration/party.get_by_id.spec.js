'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Party } = require(path.join(__dirname, '..', '..'));

describe('Party', function () {

  before(function (done) {
    Party.remove(done);
  });

  describe('get by id', function () {

    let party;

    before(function (done) {
      const fake = Party.fake();
      fake
        .post(function (error, created) {
          party = created;
          done(error, created);
        });
    });

    it('should be able to get an instance', function (done) {
      Party
        .getById(party._id, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(party._id);
          done(error, found);
        });
    });

    it('should be able to get with options', function (done) {

      const options = {
        _id: party._id,
        select: 'name'
      };

      Party
        .getById(options, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(party._id);
          expect(found.name).to.exist;

          //...assert selection
          const fields = _.keys(found.toObject());
          expect(fields).to.have.length(2);
          _.map([
            'location',
            'phone',
            'email',
            'createdAt',
            'updatedAt'
          ], function (field) {
            expect(fields).to.not.include(field);
          });

          done(error, found);
        });

    });

    it('should throw if not exists', function (done) {
      const party = Party.fake();

      Party
        .getById(party._id, function (error, found) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(found).to.not.exist;
          done();
        });
    });

  });

  after(function (done) {
    Party.remove(done);
  });

});
