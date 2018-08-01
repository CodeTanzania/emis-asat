'use strict';


/**
 * @name emis-asat
 * @description TODO
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('emis-asat');
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/* import models */
const Permission =
  require(path.join(__dirname, 'lib', 'permission.model'));
const Role =
  require(path.join(__dirname, 'lib', 'role.model'));
const Party =
  require(path.join(__dirname, 'lib', 'party.model'));


/* export party model */
exports.Permission = Permission;
exports.Role = Role;
exports.Party = Party;


/* export schema definition */
exports.definitions = {
  Permission: Permission.jsonSchema(),
  Role: Role.jsonSchema(),
  Party: Party.jsonSchema(),
};


/* import routers*/
const partyRouter = require(path.join(__dirname, 'lib', 'party.http.router'));
const roleRouter = require(path.join(__dirname, 'lib', 'role.http.router'));
const permissionRouter =
  require(path.join(__dirname, 'lib', 'permission.http.router'));


/* export party router */
exports.partyRouter = partyRouter;
exports.roleRouter = roleRouter;
exports.permissionRouter = permissionRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind routers */
    app.mount(partyRouter);
    app.mount(roleRouter);
    app.mount(permissionRouter);
    return app;
  }

});
