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
 * @todo add device details(android, iOS etc)
 * @todo add virtual permissions with autopopulation
 * @todo add support to links i.e facebook, twitter etc
 * @todo add party parent
 * @todo send link for sharing contact
 * @todo export contacts as vcard
 * @todo should send(or receive) a notification(email, sms etc)
 */


/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Point } = require('mongoose-geojson-schemas');
const { schema, models, env } = require('@codetanzania/majifix-common');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const { POPULATION_MAX_DEPTH } = schema;
const { PARTY_MODEL_NAME, ROLE_MODEL_NAME } = models;
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });
const { DEFAULT_LOCALE, LOCALES, getArray } = env;
const { DEFAULT_PARTY_TYPE = 'Other' } = process.env; //TODO refactor to env
const { DEFAULT_PARTY_OWNERSHIP = 'Other' } = process.env; //TODO refactor to env
const DISASTER_PHASES = ([].concat(getArray('DISASTER_PHASES', ['Mitigation'])));
const PARTY_TYPES = ([].concat(getArray('PARTY_TYPES', DEFAULT_PARTY_TYPE)));
const PARTY_OWNERSHIP =
  ([].concat(getArray('PARTY_OWNERSHIP', DEFAULT_PARTY_OWNERSHIP)));
const OPTION_ROLE_AUTOPOPULATE = ({
  select: { name: 1, type: 1, description: 1 },
  maxDepth: POPULATION_MAX_DEPTH
});
const OPTION_AUTOPOPULATE = ({
  select: { name: 1, type: 1, email: 1, phone: 1 },
  maxDepth: POPULATION_MAX_DEPTH
});


/**
 * @name PartySchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const PartySchema = new Schema({
  /**
   * @name party
   * @description Top party under which this party derived.
   *
   * This is applicable where a large party delegates
   * its power to its division(s).
   *
   * If not set the party will be treated as a top
   * party and will be affected by any logics implemented
   * accordingly.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - party population options
   * @property {object} autopopulate.select - party fields to
   * select when populating
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  party: {
    type: ObjectId,
    ref: PARTY_MODEL_NAME,
    exists: true,
    autopopulate: OPTION_AUTOPOPULATE,
    index: true
  },


  /**
   * @name type
   * @description Human readable category of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} default - default value if non provided
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * Sector, Agency, Individual etc.
   */
  type: {
    type: String,
    trim: true,
    enum: PARTY_TYPES,
    default: DEFAULT_PARTY_TYPE,
    searchable: true,
    fake: true,
    index: true
  },


  /**
   * @name ownership
   * @description Describe form of possession(exclusive rights and control over)
   * of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} default - default value if non provided
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * Government, Private etc.
   */
  ownership: {
    type: String,
    trim: true,
    enum: PARTY_OWNERSHIP,
    default: DEFAULT_PARTY_OWNERSHIP,
    searchable: true,
    fake: true,
    index: true
  },


  /**
   * @name phases
   * @description Participatory phases of a party in disaster management.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} enum - list of acceptable values
   * @property {object} default - default value if non provided
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phases: {
    type: [String],
    enum: DISASTER_PHASES,
    default: undefined,
    searchable: true,
    index: true
  },


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
   * @name avatar
   * @description Image(logo or face) of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * https://s3.amazonaws.com/uifaces/faces/twitter/agustincruiz/128.jpg
   */
  avatar: {
    type: String,
    trim: true,
    fake: {
      generator: 'iamge',
      type: 'avatar'
    }
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
   * @name locale
   * @description Defines the party's language, region and any
   * special variant preferences.
   *
   * Used to localize(format) party preferences on UI etc.
   *
   * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   * @property {boolean} default - default value if non provided
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  locale: {
    type: String,
    trim: true,
    enum: LOCALES,
    searchable: true,
    index: true,
    default: DEFAULT_LOCALE,
    fake: true
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
  location: Point,


  /**
   * @name roles
   * @description Assignable or given roles that permits(or give access rights)
   * to a party
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {object} autopopulate.select - jurisdiction fields to
   * select when populating
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  roles: {
    type: [ObjectId],
    ref: ROLE_MODEL_NAME,
    default: undefined,
    exists: true,
    autopopulate: OPTION_ROLE_AUTOPOPULATE,
    index: true
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


//ensure `unique` compound index on name, phone and email
//to fix unique indexes on email, phone and name in case they are used in more
//than one party
PartySchema.index({ type: 1, name: 1, phone: 1, email: 1 }, { unique: true });


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
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
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
 * @description pre save party logics
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
PartySchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
PartySchema.statics.LOCALES = LOCALES;
PartySchema.statics.DEFAULT_PARTY_TYPE = DEFAULT_PARTY_TYPE;
PartySchema.statics.PARTY_TYPES = PARTY_TYPES;
PartySchema.statics.DISASTER_PHASES = DISASTER_PHASES;
PartySchema.statics.DEFAULT_PARTY_OWNERSHIP = DEFAULT_PARTY_OWNERSHIP;
PartySchema.statics.PARTY_OWNERSHIP = PARTY_OWNERSHIP;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
PartySchema.plugin(actions);


/* export party model */
module.exports = mongoose.model(PARTY_MODEL_NAME, PartySchema);
