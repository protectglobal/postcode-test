import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import TestAPI from './test-api.js';

const sha256 = require('js-sha256');

const { domainName } = Meteor.settings.public;

//------------------------------------------------------------------------------
/**
* @summary send HTTP request to insert-customer API endpoint.
*/
Meteor.methods({ insertCustomer(curUser, newCustomer) {
  check(curUser, {
    email: String,
    password: String,
  });
  check(newCustomer, {
    name: Match.Maybe(String),
    postalCode: Match.Maybe(String),
    phoneNumber: Match.Maybe(String),
    email: Match.Maybe(String),
  });

  const credentials = {
    domainName,
    email: curUser.email,
    password: sha256(curUser.password),
    hashed: true,
  };

  // Login into the API
  const { status, authToken, userId } = TestAPI.login(credentials);
  if (status !== 200) {
    throw new Meteor.Error(401, 'Enable to authenticate user. Please, verify your credentials.');
  }

  // HTTP request to insert-customer API endpoint.
  const loggedInParams = { domainName, authToken, userId };
  const params = Object.assign({}, loggedInParams, { customer: newCustomer });
  return TestAPI.insertCustomer(params); // response
} });
//------------------------------------------------------------------------------
