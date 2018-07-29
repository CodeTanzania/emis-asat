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


/* import models */
const Party =
  require(path.join(__dirname, 'lib', 'party.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'party.http.router'));


/* export package(module) info */
exports.info = info;


/* export party model */
exports.Party = Party;


/* export party router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind party router */
    app.mount(router);
    return app;
  }

});
