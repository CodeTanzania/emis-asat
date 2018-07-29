'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const { Party, router, app } = require(path.join(__dirname, '..', '..'));


describe('Party', function () {

  describe('Rest API', function () {

    before(function (done) {
      Party.remove(done);
    });

    let party;

    it('should handle HTTP POST on /parties', function (done) {

      party = Party.fake();

      request(app)
        .post(`/v${router.apiVersion}/parties`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(party)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.name).to.exist;

          done(error, response);

        });

    });

    it('should handle HTTP GET on /parties', function (done) {

      request(app)
        .get(`/v${router.apiVersion}/parties`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);

        });
    });

    it('should handle HTTP GET on /parties/id:', function (done) {

      request(app)
        .get(
          `/v${router.apiVersion}/parties/${party._id}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(party._id.toString());
          expect(found.name).to.be.equal(party.name);

          done(error, response);
        });
    });

    it('should handle HTTP PATCH on /parties/id:', function (done) {

      const patch = party.fakeOnly('name');

      request(app)
        .patch(
          `/v${router.apiVersion}/parties/${party._id}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(party._id.toString());
          expect(patched.name).to.be.equal(party.name);

          done(error, response);

        });

    });

    it('should handle HTTP PUT on /parties/id:', function (done) {

      const put = party.fakeOnly('name');

      request(app)
        .put(
          `/v${router.apiVersion}/parties/${party._id}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(party._id.toString());
          expect(updated.name).to.be.equal(party.name);

          done(error, response);

        });

    });

    it('should handle HTTP DELETE on /parties/:id', function (
      done) {

      request(app)
        .delete(
          `/v${router.apiVersion}/parties/${party._id}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(party._id.toString());
          expect(deleted.name).to.be.equal(party.name);

          done(error, response);

        });

    });


    after(function (done) {
      Party.remove(done);
    });

  });

});
