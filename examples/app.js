'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-asat');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { env } = require('@codetanzania/majifix-common');
const { getStrings } = env;
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
let parties = require('./samples').party(20);
const PARTY_TYPES = getStrings('PARTY_TYPES', ['Other']);
const DISASTER_PHASES = getStrings('DISASTER_PHASES', ['Mitigation']);
const PARTY_OWNERSHIP = getStrings('PARTY_OWNERSHIP', ['Other']);



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
      let roles = Role.fake(3);
      roles = _.map(roles, function (role, index) {
        role.permissions = _.take(permissions, (index % 3) + 1);
        return role;
      });
      Role.create(roles, next);
    },

    function seedParty(roles, next) {
      /* fake parties */
      parties = _.map(parties, function (party, index) {
        party.type = _.nth(PARTY_TYPES, index % PARTY_TYPES.length);
        party.ownership =
          _.nth(PARTY_OWNERSHIP, index % PARTY_OWNERSHIP.length);
        party.roles = _.take(roles, (index % roles.length) + 1);
        if (index % 2 === 0) {
          party.phases =
            _.take(DISASTER_PHASES, (index % DISASTER_PHASES.length) +
              1);
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
