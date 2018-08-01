'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-asat');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
// mongoose.set('debug', true);
const {
  Role,
  Party,
  Permission,
  partyRouter,
  info,
  app,
  definitions
} = require(path.join(__dirname, '..'));

/* generate fake data */
let roles = require('./samples').role(10);
let parties = require('./samples').party(20);

const { env } = require('@codetanzania/majifix-common');
const { getArray } = env;
const DISASTER_PHASES = [].concat(getArray('DISASTER_PHASES', ['Mitigation']));



/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      Party.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clear(next) {
      Role.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clear(next) {
      Permission.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedPermission(next) {
      const permissions = Permission.fake(5);
      Permission.create(permissions, next);
    },

    function seedRole(permissions, next) {
      /* fake parties */
      roles = _.map(roles, function (role, index) {
        if (index % 2 === 0) {
          role.permissions = _.take(permissions, Math.ceil(index / 3));
        }
        return role;
      });
      Role.create(roles, next);
    },

    function seedParty(roles, next) {
      /* fake parties */
      parties = _.map(parties, function (party, index) {
        if ((index % 2 === 0)) {
          party.roles = _.take(roles, Math.ceil(index / 3));
          party.phases = _.take(DISASTER_PHASES, Math.ceil(index / 8));
        }
        return party;
      });
      Party.create(parties, next);
    }

  ], function (error, results) {

    console.log(error);

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* expose schema info */
    app.get(`/v${partyRouter.apiVersion}/schema`, function (request,
      response) {
      response.status(200);
      response.json({ definitions });
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
