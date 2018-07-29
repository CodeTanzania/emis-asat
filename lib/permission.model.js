'use strict';


/**
 * @module Permission
 * @name Permission
 * @description An entity that defines permits that are assignable to role(s)
 *
 * Note!: permissions are dynamic generated during booting and are only
 * assignable to party(ies) roles.
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
 */


/* dependencies */
const _ = require('lodash');
const inflection = require('inflection');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { models } = require('@codetanzania/majifix-common');
const { Schema } = mongoose;


/* constants */
const { PERMISSION_MODEL_NAME } = models;
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });


/**
 * @name PermissionSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const PermissionSchema = new Schema({
  /**
   * @name resource
   * @description Resource constrained by a permission.
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
   * Party, Activity, Task etc.
   */
  resource: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'noun'
    },
    index: true
  },


  /**
   * @name action
   * @description Action(or permit) constrained(or granted) by a permission.
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
   * Create, Update, Delete, Send etc.
   */
  action: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'verb'
    },
    index: true
  },


  /**
   * @name description
   * @description A brief summary about a permission if available i.e
   * additional details that clarify what a permission for.
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
   * @name wildcard
   * @description System unique identifier of a permission.
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
  wildcard: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'ingverb',
      unique: true
    },
    index: true
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


//ensure `unique` compound index on name, action and wildcard
//to force unique permission definition
PermissionSchema.index({ resource: 1, action: 1, wildcard: 1 }, { unique: true });


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @description permission schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
PermissionSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @description permission schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PermissionSchema.methods.preValidate = function preValidate(done) {

  //normalize attributes

  //classify resource
  if (!_.isEmpty(this.resource)) {
    this.resource = inflection.classify(this.resource);
  }

  //lowercase action
  if (!_.isEmpty(this.action)) {
    this.action = this.action.toLowerCase();
  }

  //ensure description
  if (_.isEmpty(this.description)) {
    this.description = [this.resource, this.action].join(' ');
  }

  //generate wildcard
  if (_.isEmpty(this.wildcard)) {
    this.wildcard = [this.resource, this.action].join(':');
  }

  //continue
  done();

};


/**
 * @name beforePost
 * @description pre save permission logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PermissionSchema.methods.beforePost = function beforePost(done) {

  /**
   * @todo ensure derived properties
   */
  done();

};


/**
 * @name afterPost
 * @description post save permission logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PermissionSchema.methods.afterPost = function afterPost(done) {

  /**
   * @todo sync(upsert) permission to public api(cloud instance)
   * in background
   */
  done();

};


/**
 * @name beforeDelete
 * @description pre delete permission logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PermissionSchema.methods.beforeDelete = function beforeDelete(done) {

  /**
   * @todo check permission dependencies and refs
   */
  done();

};


/**
 * @name afterDelete
 * @description post delete permission logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PermissionSchema.methods.afterDelete = function afterDelete(done) {

  /**
   * @todo sync(upsert) permission to public api(cloud instance)
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
PermissionSchema.statics.MODEL_NAME = PERMISSION_MODEL_NAME;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
PermissionSchema.plugin(actions);


/* export permission model */
module.exports = mongoose.model(PERMISSION_MODEL_NAME, PermissionSchema);
