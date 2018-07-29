'use strict';


/**
 * @module Party
 * @name Party
 * @description An entity (e.g municipal) responsible in disaster management.
 *
 * It may be a self managed entity or division within another
 * entity(party) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */


/*
 * @todo add list of secondary contacts
 * @todo add country details(code, currency, calling code etc)
 * @todo add device details
 * @todo add i18n & l10n settings
 * @todo add default locale
 */


/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Point } = require('mongoose-geojson-schemas');
const { Schema } = mongoose;


/* constants */
const PARTY_MODEL_NAME = 'Party';
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });


/**
 * @name PartySchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const PartySchema = new Schema({
  /**
   * @name name
   * @description Unique human readable name of a party.
   *
   * It may be organization name e.g ACME Inc., person name e.g Juma John,
   * division withing organization e.g HR Dept etc.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * ACME Inc.
   */
  name: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'name',
      type: 'findName'
    },
    index: true
  },


  /**
   * @name phone
   * @description Primary mobile phone number used to contact a party.
   *
   * Used when another party want to send a direct message or
   * call the other party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 255765222333
   */
  phone: {
    type: String,
    mobile: true,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
  },


  /**
   * @name landline
   * @description Primary main-line(or fixed-line) phone number
   * used to contact a party.
   *
   * Used when another party want to direct call the other party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 255-242233642
   */
  landline: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
  },


  /**
   * @name fax
   * @description Primary fax number used to contact a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 255-242233642
   */
  fax: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
  },


  /**
   * @name email
   * @description Primary email address used to contact a party.
   *
   * Used when another party want to send direct mail to the other party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} lowercase - force lower-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * john.juma@acme.com
   */
  email: {
    type: String,
    email: true,
    trim: true,
    required: true,
    lowercase: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'email'
    },
    index: true
  },


  /**
   * @name website
   * @description Primary website url(or link) of a party.
   *
   * Used when another party want to obtain specific information about
   * other party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} lowercase - force lower-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * https://www.acme.com
   */
  website: {
    type: String,
    trim: true,
    lowercase: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'url'
    },
    index: true
  },


  /**
   * @name about
   * @description A brief summary about a party if available i.e
   * additional details that clarify what a party do.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  about: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    },
    index: true
  },


  /**
   * @name pysicalAddress
   * @description Primary physical address of party office.
   *
   * Used when another party what to physical go or visit the other
   * party office.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * ACME Inc.
   * 2nd Floor "De Doctor Plaza"
   * Plot 440 Jomo Drive Masaki
   * Dar es Salaam, Tanzania
   */
  physicalAddress: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    },
    index: true
  },


  /**
   * @name postalAddress
   * @description Primary postal address of party office.
   *
   * Used when another party what to send letter, percerls etc to anther
   * party office.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * ACME Inc.
   * P.O.Box 9683
   * Dar es Salaam
   * Tanzania
   */
  postalAddress: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    },
    index: true
  },


  /**
   * @name location
   * @description A geo-location coordinates of a party main office.
   *
   * Its a coordinates(longitude and latidude) pair of office reachable by
   * other party.
   *
   * @type {object}
   * @property {object} location - geo json point
   * @property {string} location.type - Point
   * @property {number[]} location.coordinates - longitude, latitude pair of
   * the geo point
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * {
   *    type: 'Point',
   *    coordinates: [-76.80207859497996, 55.69469494228919]
   * }
   */
  location: Point

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


//ensure `unique` compound index on name, phone and email
//to fix unique indexes on email, phone and name in case they are used in more
//than one party
PartySchema.index({ name: 1, phone: 1, email: 1 }, { unique: true });


/*
 *------------------------------------------------------------------------------
 *  Virtual
 *------------------------------------------------------------------------------
 */


/**
 * @name longitude
 * @description obtain party longitude
 * @type {number}
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.virtual('longitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[0] : 0;
});


/**
 * @name latitude
 * @description obtain party latitude
 * @type {number}
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.virtual('latitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[1] : 0;
});


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @description party schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
PartySchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *-----------------------------------------------------------------------------------
 *  Instance
 *-----------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @description party schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.methods.preValidate = function preValidate(done) {
  done();
};


/**
 * @name beforePost
 * @description pre save account logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.methods.beforePost = function beforePost(done) {

  /**
   * @todo ensure derived properties
   */
  done();

};


/**
 * @name afterPost
 * @description post save party logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.methods.afterPost = function afterPost(done) {

  /**
   * @todo sync(upsert) party to public api(cloud instance)
   * in background
   */
  done();

};


/**
 * @name beforeDelete
 * @description pre delete party logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.methods.beforeDelete = function beforeDelete(done) {

  /**
   * @todo check party dependencies and refs
   */
  done();

};


/**
 * @name afterDelete
 * @description post delete party logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PartySchema.methods.afterDelete = function afterDelete(done) {

  /**
   * @todo sync(upsert) party to public api(cloud instance)
   * in background
   */
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
PartySchema.statics.MODEL_NAME = PARTY_MODEL_NAME;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
PartySchema.plugin(actions);


/* export party model */
module.exports = mongoose.model(PARTY_MODEL_NAME, PartySchema);
