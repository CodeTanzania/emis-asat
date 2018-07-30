'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const Party =
  require(path.join(__dirname, '..', '..', 'lib', 'party.model'));


describe('Party', function () {


  describe('Schema', function () {

    it('should have name field', function () {

      const name = Party.schema.tree.name;
      const instance = Party.schema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.searchable).to.be.true;
      expect(name.index).to.be.true;

    });

    it('should have avatar field', function () {

      const avatar = Party.schema.tree.avatar;
      const instance = Party.schema.paths.avatar.instance;

      expect(instance).to.be.equal('String');
      expect(avatar).to.exist;
      expect(avatar).to.be.an('object');
      expect(avatar.type).to.be.a('function');
      expect(avatar.type.name).to.be.equal('String');
      expect(avatar.trim).to.be.true;

    });

    it('should have phone field', function () {

      const phone = Party.schema.tree.phone;
      const instance = Party.schema.paths.phone.instance;

      expect(instance).to.be.equal('String');
      expect(phone).to.exist;
      expect(phone).to.be.an('object');
      expect(phone.type).to.be.a('function');
      expect(phone.type.name).to.be.equal('String');
      expect(phone.required).to.be.true;
      expect(phone.trim).to.be.true;
      expect(phone.index).to.be.true;
      expect(phone.searchable).to.be.true;

    });

    it('should have landline field', function () {

      const landline = Party.schema.tree.landline;
      const instance = Party.schema.paths.landline.instance;

      expect(instance).to.be.equal('String');
      expect(landline).to.exist;
      expect(landline).to.be.an('object');
      expect(landline.type).to.be.a('function');
      expect(landline.type.name).to.be.equal('String');
      expect(landline.trim).to.be.true;
      expect(landline.index).to.be.true;
      expect(landline.searchable).to.be.true;

    });

    it('should have fax field', function () {

      const fax = Party.schema.tree.fax;
      const instance = Party.schema.paths.fax.instance;

      expect(instance).to.be.equal('String');
      expect(fax).to.exist;
      expect(fax).to.be.an('object');
      expect(fax.type).to.be.a('function');
      expect(fax.type.name).to.be.equal('String');
      expect(fax.trim).to.be.true;
      expect(fax.index).to.be.true;
      expect(fax.searchable).to.be.true;

    });

    it('should have email field', function () {

      const email = Party.schema.tree.email;
      const instance = Party.schema.paths.email.instance;

      expect(instance).to.be.equal('String');
      expect(email).to.exist;
      expect(email).to.be.an('object');
      expect(email.type).to.be.a('function');
      expect(email.type.name).to.be.equal('String');
      expect(email.trim).to.be.true;
      expect(email.lowercase).to.be.true;
      expect(email.index).to.be.true;
      expect(email.searchable).to.be.true;

    });

    it('should have website field', function () {

      const website = Party.schema.tree.website;
      const instance = Party.schema.paths.website.instance;

      expect(instance).to.be.equal('String');
      expect(website).to.exist;
      expect(website).to.be.an('object');
      expect(website.type).to.be.a('function');
      expect(website.type.name).to.be.equal('String');
      expect(website.trim).to.be.true;
      expect(website.searchable).to.be.true;

    });

    it('should have about field', function () {

      const about = Party.schema.tree.about;
      const instance = Party.schema.paths.about.instance;

      expect(instance).to.be.equal('String');
      expect(about).to.exist;
      expect(about).to.be.an('object');
      expect(about.type).to.be.a('function');
      expect(about.type.name).to.be.equal('String');
      expect(about.trim).to.be.true;
      expect(about.searchable).to.be.true;
      expect(about.index).to.be.true;

    });

    it('should have physicalAddress field', function () {

      const physicalAddress = Party.schema.tree.physicalAddress;
      const instance = Party.schema.paths.physicalAddress.instance;

      expect(instance).to.be.equal('String');
      expect(physicalAddress).to.exist;
      expect(physicalAddress).to.be.an('object');
      expect(physicalAddress.type).to.be.a('function');
      expect(physicalAddress.type.name).to.be.equal('String');
      expect(physicalAddress.trim).to.be.true;
      expect(physicalAddress.index).to.be.true;
      expect(physicalAddress.searchable).to.be.true;

    });

    it('should have postalAddress field', function () {

      const postalAddress = Party.schema.tree.postalAddress;
      const instance = Party.schema.paths.postalAddress.instance;

      expect(instance).to.be.equal('String');
      expect(postalAddress).to.exist;
      expect(postalAddress).to.be.an('object');
      expect(postalAddress.type).to.be.a('function');
      expect(postalAddress.type.name).to.be.equal('String');
      expect(postalAddress.trim).to.be.true;
      expect(postalAddress.index).to.be.true;
      expect(postalAddress.searchable).to.be.true;

    });

    it('should have locale field', function () {

      const locale = Party.schema.tree.locale;
      const instance = Party.schema.paths.locale.instance;

      expect(instance).to.be.equal('String');
      expect(locale).to.exist;
      expect(locale).to.be.an('object');
      expect(locale.type).to.be.a('function');
      expect(locale.type.name).to.be.equal('String');
      expect(locale.trim).to.be.true;
      expect(locale.enum).to.exist;
      expect(locale.index).to.be.true;
      expect(locale.default).to.exist;
      expect(locale.searchable).to.be.true;

    });


    describe('location', function () {

      it('should be an embedded subdocument', function () {

        const location = Party.schema.tree.location;
        const instance = Party.schema.paths.location.instance;
        const tree = Party.schema.paths.location.schema.tree;

        expect(instance).to.be.equal('Embedded');
        expect(location).to.exist;
        expect(location).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;

      });

      it('should have GeoJSON type field', function () {

        const schema = Party.schema.paths.location.schema;
        const type = schema.tree.type;
        const instance = schema.paths.type.instance;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;

      });

      it('should have GeoJSON coordinates field', function () {

        const schema = Party.schema.paths.location.schema;
        const coordinates = schema.tree.coordinates;
        const instance = schema.paths.coordinates.instance;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.a('function');
        expect(coordinates.type[0].name).to.be.equal(
          'Number');

      });

    });


  });


});
