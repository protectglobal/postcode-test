// import { Meteor } from 'meteor/meteor';
import { expect, be } from 'meteor/practicalmeteor:chai';
import { check } from 'meteor/check';
import TestAPI from './test-api.js';

const sha256 = require('js-sha256');

// const { testCode } = Meteor.settings;

// Namespace
const TestSuit = {};

//------------------------------------------------------------------------------
// LOGIN NO CREDENTIALS:
//------------------------------------------------------------------------------
/**
* @param {string} - domainName in { http://localhost:3000, https://protect-global.com }
*/
TestSuit.loginNoCredentials = (domainName) => {
  // Check args
  check(domainName, String);

  console.log('\n');
  console.log('**************');
  console.log('TEST START loginNoCredentials');

  const args = { domainName };
  const res = TestAPI.login(args);
  console.log(res);

  expect(
    res,
  ).to.deep.equal({
    status: 401,
    data: {
      status: 'error',
      message: 'Unauthorized',
    },
    authToken: '',
    userId: '',
  });
};
//------------------------------------------------------------------------------
// LOGIN WRONG CREDENTIALS:
//------------------------------------------------------------------------------
TestSuit.loginWrongCredentials = ({ domainName, email, password }) => {
  // Check args
  check(domainName, String);
  check(email, String);
  check(password, String);

  console.log('\n');
  console.log('**************');
  console.log('TEST START loginWrongCredentials');

  const params = {
    domainName,
    email,
    password: sha256(`${password}bla`), // wrong password
    hashed: true,
  };
  const res = TestAPI.login(params);
  console.log(res);

  expect(
    res,
  ).to.deep.equal({
    status: 401,
    data: {
      status: 'error',
      message: 'Unauthorized',
    },
    authToken: '',
    userId: '',
  });
};
//------------------------------------------------------------------------------
// LOGIN WRONG CREDENTIALS:
//------------------------------------------------------------------------------
TestSuit.loginNonHashedPassword = ({ domainName, email, password }) => {
  // Check args
  check(domainName, String);
  check(email, String);
  check(password, String);

  // DEV (FORCE HASH PASSWORD DISABLED)
  /* console.log('\n');
  console.log('**************');
  console.log('TEST START loginNonHashedPassword');
  console.log('TestAPI.loginNonHashedPassword(params)', TestAPI.loginNonHashedPassword(params));
  expect(
    TestAPI.loginNonHashedPassword(params)
  ).to.not.deep.equal({
    status: 500,
    authToken: '',
    userId: '',
  }); */

  // PRODUCTION
  console.log('\n');
  console.log('**************');
  console.log('TEST START loginNonHashedPassword');

  const params = {
    domainName,
    email,
    password, // non-hashed password
    // hashed: true, <-- what about this?
  };
  const res = TestAPI.login(params);
  console.log(res);

  expect(
    res,
  ).to.deep.equal({ // <--
    status: 500,
    data: {},
    authToken: '',
    userId: '',
  });
};
//------------------------------------------------------------------------------
// LOGIN RIGHT CREDENTIALS:
//------------------------------------------------------------------------------
TestSuit.loginRightCredentials = ({ domainName, email, password }) => {
  // Check args
  check(domainName, String);
  check(email, String);
  check(password, String);

  console.log('\n');
  console.log('**************');
  console.log('TEST START loginRightCredentials');

  const params = {
    domainName,
    email,
    password: sha256(password),
    hashed: true,
  };
  const { status, authToken, userId } = TestAPI.login(params);
  console.log('status', status);
  console.log('authToken', authToken);
  console.log('userId', userId);

  expect(status).to.equal(200);

  expect(authToken).to.not.equal('');

  expect(userId).to.not.equal('');

  const loggedInParams = {
    domainName: params.domainName,
    authToken,
    userId,
  };

  // Return logged in params in order to use them in future auth calls
  return loggedInParams;
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER NAME IS MISSING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerNameIsMissing = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerNameIsMissing');

  const customer = {
    // name is missing!
    postalCode: 'WC2N 5DU',
    phoneNumber: '01727 830398',
    email: 'email@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);
  console.log('res', res);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Name is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER NAME IS EMPTY STRING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerNameIsEmptyString = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerNameIsEmptyString');

  const customer = {
    name: '', // name is empty string!
    postalCode: 'WC2N 5DU',
    phoneNumber: '01727 830398',
    email: 'email@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Name is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER POST CODE IS MISSING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerPostalCodeIsMissing = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPostalCodeIsMissing');

  const customer = {
    name: 'John Smith',
    // postalCode is missing!
    phoneNumber: '01727 830398',
    email: 'email@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Postal Code is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER POST CODE IS EMPTY STRING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerPostalCodeIsEmptyString = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPostalCodeIsEmptyString');

  const customer = {
    name: 'John Smith',
    postalCode: '', // postal code is empty string
    phoneNumber: '01727 830398',
    email: 'email@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Postal Code is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER PHONE NUMBER IS MISSING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerPhoneNumberIsMissing = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPhoneNumberIsMissing');

  const customer = {
    name: 'John Smith',
    postalCode: 'WC2N 5DU',
    // phoneNumber is missing!
    email: 'email@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Phone Number is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER PHONE NUMBER IS EMPTY STRING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerPhoneNumberIsEmptyString = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPhoneNumberIsEmptyString');

  const customer = {
    name: 'John Smith',
    postalCode: 'WC2N 5DU',
    phoneNumber: '', // phone number is empty string
    email: 'email@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Phone Number is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER EMAIL IS MISSING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerEmailIsMissing = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerEmailIsMissing');

  const customer = {
    name: 'John Smith',
    postalCode: 'WC2N 5DU',
    phoneNumber: '01727 830398',
    // email is missing!
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Email is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER EMAIL IS EMPTY STRING:
//------------------------------------------------------------------------------
TestSuit.insertCustomerEmailIsEmptyString = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerEmailIsEmptyString');

  const customer = {
    name: 'John Smith',
    postalCode: 'WC2N 5DU',
    phoneNumber: '01727 830398',
    email: '', // email is empty string!
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const res = TestAPI.insertCustomer(params);

  expect(
    res,
  ).to.deep.equal({
    status: 404,
    data: {
      status: 'fail',
      message: 'Email is required',
    },
  });
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER EMAIL RIGHT DATA:
//------------------------------------------------------------------------------
TestSuit.insertCustomerRightData = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerRightData');

  const customer = {
    name: 'John Smith',
    postalCode: 'WC2N 5DU',
    phoneNumber: '01727 830398',
    email: 'john@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const { status, data } = TestAPI.insertCustomer(params);
  console.log('data', data);

  expect(status).to.equal(200);
  expect(data.status).to.equal('success');
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER GET INSTALLER:
//------------------------------------------------------------------------------
TestSuit.insertCustomerGetInstaller = (loggedInParams, matcher) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });
  check(matcher, {
    postalCode: String,
    companyName: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerGetInstaller');

  const customer = {
    name: 'John Smith',
    postalCode: matcher.postalCode,
    phoneNumber: '01727 830398',
    email: 'john@example.com',
  };
  const params = Object.assign({}, loggedInParams, { customer });
  const { status, data } = TestAPI.insertCustomer(params);

  expect(status).to.equal(200);
  expect(data.status).to.equal('success');
  expect(JSON.parse(data.message).companyName).to.equal(matcher.companyName);
};
//------------------------------------------------------------------------------
// CLEAR DB:
//------------------------------------------------------------------------------
TestSuit.clearTestDB = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START clear test DB FIRST: remove test docs created by this test');

  const params = Object.assign({}, loggedInParams);
  const { status } = TestAPI.clearTestDB(params);
  expect(status).to.equal(200);
};
//------------------------------------------------------------------------------
// CLEAR DB:
//------------------------------------------------------------------------------
TestSuit.logout = (loggedInParams) => {
  // Check args
  check(loggedInParams, {
    domainName: String,
    authToken: String,
    userId: String,
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START logout');

  expect(
    TestAPI.logout(loggedInParams),
  ).to.deep.equal({
    status: 200,
    data: {
      status: 'success',
      data: {
        message: 'You\'ve been logged out!',
      },
    },
  });
};

// TODO: try to do some operation after logout using the old credentials?
//------------------------------------------------------------------------------

export default TestSuit;
