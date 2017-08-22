import { HTTP } from 'meteor/http';

const sha256 = require('js-sha256');

// Namespace
const TestAPI = {};

//------------------------------------------------------------------------------
// LOGIN NO CREDENTIALS
//------------------------------------------------------------------------------
TestAPI.loginNoCredentials = (domainName) => {
  /* console.log('\n');
  console.log('----------------');
  console.log('TestAPI.loginNoCredentials'); */

  const endpoint = `${domainName}/api/v1/login`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {};
  let result = '';

  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (e) {
    return {
      status: e.response.statusCode,
      data: e.response.data,
    };
  }

  return {
    status: result.statusCode,
    data: result.data,
  };
};
//------------------------------------------------------------------------------
// LOGIN WRONG CREDENTIALS
//------------------------------------------------------------------------------
TestAPI.loginWrongCredentials = ({ domainName, email, password }) => {
  /* console.log('\n');
  console.log('----------------');
  console.log('TestAPI.loginWrongCredentials'); */

  const endpoint = `${domainName}/api/v1/login`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    email,
    password: sha256(`${password}bla`), // wrong password
    hashed: true,
  };
  let result = '';

  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (e) {
    return {
      status: e.response.statusCode,
      data: e.response.data,
    };
  }

  return {
    status: result.statusCode,
    data: result.data,
  };
};
//------------------------------------------------------------------------------
// LOGIN NON HASHED PASSWORD
//------------------------------------------------------------------------------
TestAPI.loginNonHashedPassword = ({ domainName, email, password }) => {
  /* console.log('\n');
  console.log('----------------');
  console.log('TestAPI.loginNonHashedPassword'); */

  const endpoint = `${domainName}/api/v1/login`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    email,
    password,
    // hashed: 'true',
  };
  let result = '';
  console.log(`non-hashed password: ${data.password}`);

  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (e) {
    return {
      status: e.response.statusCode,
      authToken: '',
      userId: '',
    };
  }

  return {
    status: result.statusCode,
    authToken: result.data.data.authToken,
    userId: result.data.data.userId,
  };
};
//------------------------------------------------------------------------------
// LOGIN RIGHT CREDENTIALS
//------------------------------------------------------------------------------
TestAPI.loginRightCredentials = ({ domainName, email, password }) => {
  /* console.log('\n');
  console.log('----------------');
  console.log('TestAPI.loginRightCredentials'); */

  const endpoint = `${domainName}/api/v1/login`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    email,
    password: sha256(password),
    hashed: true,
  };
  let result = '';
  console.log(`hashed password: ${data.password}`);

  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (e) {
    return {
      status: e.response.statusCode,
      authToken: '',
      userId: '',
    };
  }

  return {
    status: result.statusCode,
    authToken: result.data.data.authToken,
    userId: result.data.data.userId,
  };
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER:
//------------------------------------------------------------------------------
// curl -H "Content-Type: application/json" -H "X-Auth-Token: GYG4QxtEanyD7xSqac8eJKFKjHO-4PMfsEpF_6eQyof" -H "X-User-Id: GeN6cS5m7boGzWE9y" -X POST -d '{"name":"John Smith","postalCode":"XXXX", "phoneNumber": "5434554", "email": "email@example.com"}' http://localhost:3000/api/v1/insert-customer/
TestAPI.insertCustomer = ({ domainName, authToken, userId, customer }) => {
  /* console.log('\n');
  console.log('----------------');
  console.log('TestAPI.insertCustomer'); */

  const endpoint = `${domainName}/api/v1/insert-customer`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken,
    'X-User-Id': userId,
  };
  const data = customer; // { name, postalCode, phoneNumber, email }
  let result = '';

  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (e) {
    return {
      status: e.response.statusCode,
      data: e.response.data,
    };
  }

  return {
    status: result.statusCode,
    data: result.data,
  };
};
//------------------------------------------------------------------------------
// CLEAR TEST DB
//------------------------------------------------------------------------------
TestAPI.clearTestDB = ({ domainName, authToken, userId }) => {
  const endpoint = `${domainName}/api/v1/clear-test-db`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken,
    'X-User-Id': userId,
  };
  const data = {};

  let result = '';

  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (e) {
    return {
      status: e.response.statusCode,
      data: e.response.data,
    };
  }

  return {
    status: result.statusCode,
    data: result.data,
  };
};
//------------------------------------------------------------------------------
// LOGOUT
//------------------------------------------------------------------------------
// curl http://localhost:3000/api/v1/logout -X POST -H "X-Auth-Token: GYG4QxtEanyD7xSqac8eJKFKjHO-4PMfsEpF_6eQyof" -H "X-User-Id: GeN6cS5m7boGzWE9y"
TestAPI.logout = ({ domainName, authToken, userId }) => {
  /* console.log('\n');
  console.log('----------------');
  console.log('TestAPI.logout'); */

  const endpoint = `${domainName}/api/v1/logout`;
  const headers = {
    'X-Auth-Token': authToken,
    'X-User-Id': userId,
  };
  let result = '';

  try {
    result = HTTP.call('POST', endpoint, { headers });
  } catch (e) {
    return {
      status: e.response.statusCode,
      data: e.response.data,
    };
  }

  return {
    status: result.statusCode,
    data: result.data,
  };
};
//------------------------------------------------------------------------------

export default TestAPI;
