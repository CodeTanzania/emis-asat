'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const Role =
  require(path.join(__dirname, '..', '..', 'lib', 'role.model'));


describe('Role', function () {


  describe('Schema', function () {

    it('should have name field', function () {

      const name = Role.schema.tree.name;
      const instance = Role.schema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.searchable).to.be.true;
      expect(name.index).to.be.true;
      expect(name.unique).to.be.true;

    });


    it('should have description field', function () {

      const description = Role.schema.tree.description;
      const instance = Role.schema.paths.description.instance;

      expect(instance).to.be.equal('String');
      expect(description).to.exist;
      expect(description).to.be.an('object');
      expect(description.type).to.be.a('function');
      expect(description.type.name).to.be.equal('String');
      expect(description.trim).to.be.true;
      expect(description.searchable).to.be.true;
      expect(description.index).to.be.true;

    });


  });


});
