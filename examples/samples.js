'use strict';


/* dependencies */
const _ = require('lodash');
const faker = require('@benmaruchu/faker');
const { randomPoint } = require('mongoose-geojson-schemas');


function sample() {
  return {
    name: faker.address.county(),
    phone: faker.phone.phoneNumber(),
    landline: faker.phone.phoneNumber(),
    fax: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    about: faker.lorem.paragraph(),
    physicalAddress: faker.address.streetAddress(),
    postalAddress: faker.address.streetAddress(),
    location: randomPoint()
  };
}


module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};
