'use strict';


/**
 * @module Role
 * @name Role
 * @description An entity that defines how a party(ies) acts or, in other words,
 * what roles the party(ies) plays in the context of the disaster management
 * environment.
 *
 * It is also a collection of permission(s) that are applicable to a specific
 * party(ies).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */


/*
 * @todo support multi language
 * @todo add flag assignable and system role
 */


/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { models, env } = require('@codetanzania/majifix-common');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const { getArray } = env;
const { ROLE_MODEL_NAME, PERMISSION_MODEL_NAME } = models;
const { DEFAULT_ROLE_TYPE = 'Other' } = process.env; //TODO refactor to env
const ROLE_TYPES = [].concat(getArray('ROLE_TYPES', DEFAULT_ROLE_TYPE));
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });


/**
 * @name RoleSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const RoleSchema = new Schema({
  /**
   * @name type
   * @description Human readable category of a role.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {string} default - default value if non provided
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * System, Assignable
   */
  type: {
    type: String,
    trim: true,
    enum: ROLE_TYPES,
    default: DEFAULT_ROLE_TYPE,
    searchable: true,
    fake: true,
    index: true
  },


  /**
   * @name name
   * @description Unique human readable name of a role.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure unique database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * Ward Officer
   */
  name: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'ingverb'
    },
    index: true,
    unique: true
  },


  /**
   * @name description
   * @description A brief summary about a role if available i.e
   * additional details that clarify what a role for.
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
  description: {
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
   * @name permissions
   * @description Defines permits(access rights) of a role
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
  permissions: {
    type: [ObjectId],
    ref: PERMISSION_MODEL_NAME,
    default: undefined,
    exists: true,
    autopopulate: true,
    index: true
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @description role schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
RoleSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @description role schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
RoleSchema.methods.preValidate = function preValidate(done) {
  done();
};


/**
 * @name beforePost
 * @description pre save role logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
RoleSchema.methods.beforePost = function beforePost(done) {

  /**
   * @todo ensure derived properties
   */
  done();

};


/**
 * @name afterPost
 * @description post save role logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
RoleSchema.methods.afterPost = function afterPost(done) {

  /**
   * @todo sync(upsert) role to public api(cloud instance)
   * in background
   */
  done();

};


/**
 * @name beforeDelete
 * @description pre delete role logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
RoleSchema.methods.beforeDelete = function beforeDelete(done) {

  /**
   * @todo check role dependencies and refs
   */
  done();

};


/**
 * @name afterDelete
 * @description post delete role logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
RoleSchema.methods.afterDelete = function afterDelete(done) {

  /**
   * @todo sync(upsert) role to public api(cloud instance)
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
RoleSchema.statics.MODEL_NAME = ROLE_MODEL_NAME;
RoleSchema.statics.DEFAULT_ROLE_TYPE = DEFAULT_ROLE_TYPE;
RoleSchema.statics.ROLE_TYPES = ROLE_TYPES;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
RoleSchema.plugin(actions);


/* export role model */
module.exports = mongoose.model(ROLE_MODEL_NAME, RoleSchema);
