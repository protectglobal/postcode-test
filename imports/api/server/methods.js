import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import TestAPI from './test-api.js';

const { domainName } = Meteor.settings.public;

//------------------------------------------------------------------------------
/**
* @summary send HTTP request to insert-customer API endpoint.
*/
Meteor.methods({ insertCustomer(curUser, newCustomer) {
  console.log(curUser, newCustomer);
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

  const params = {
    domainName,
    email: curUser.email,
    password: curUser.password,
  };

  // Login into the API
  const { status, authToken, userId } = TestAPI.loginRightCredentials(params);
  console.log(status, authToken, userId);
  if (status !== 200) {
    throw new Meteor.Error(401, 'Enable to authenticate user. Please, verify your credentials.');
  }

  // HTTP request to insert-customer API endpoint.
  const loggedInParams = { domainName, authToken, userId };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer: newCustomer }));
  console.log('res', res);

  return res;
} });
