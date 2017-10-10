import { HTTP } from 'meteor/http';
import { check, Match } from 'meteor/check';
import _ from 'underscore';

// Namespace
const TestAPI = {};

//------------------------------------------------------------------------------
// LOGIN
//------------------------------------------------------------------------------
TestAPI.login = ({ domainName, email, password, hashed }) => {
  // Check args
  check(domainName, String);
  check(email, Match.Maybe(String));
  check(password, Match.Maybe(String));
  check(hashed, Match.Maybe(Boolean));

  // Prepare HTTP request
  const endpoint = `${domainName}/api/v1/login`;
  const headers = { 'Content-Type': 'application/json' };

  const data = {};
  if (email && email.trim().length > 0) {
    _.extend(data, { email: email.trim() });
  }
  if (password && password.trim().length > 0) {
    _.extend(data, { password: password.trim() });
  }
  if (_.isBoolean(hashed)) {
    _.extend(data, { hashed });
  }

  // Send HTTP request
  let result = '';
  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (exc) {
    const { response } = exc;
    return {
      status: (response && response.statusCode) || '',
      data: (response && response.data) || {},
      authToken: '',
      userId: '',
    };
  }

  // Process result
  const { statusCode: sc, data: d } = result;
  return {
    status: sc,
    data: d,
    authToken: (d && d.data && d.data.authToken) || '',
    userId: (d && d.data && d.data.userId) || '',
  };
};
//------------------------------------------------------------------------------
// INSERT CUSTOMER:
//------------------------------------------------------------------------------
// curl -H "Content-Type: application/json" -H "X-Auth-Token: GYG4QxtEanyD7xSqac8eJKFKjHO-4PMfsEpF_6eQyof" -H "X-User-Id: GeN6cS5m7boGzWE9y" -X POST -d '{"name":"John Smith","postalCode":"XXXX", "phoneNumber": "5434554", "email": "email@example.com"}' http://localhost:3000/api/v1/insert-customer/
TestAPI.insertCustomer = ({ domainName, authToken, userId, customer }) => {
  // Check args
  check(domainName, String);
  check(authToken, Match.Maybe(String));
  check(userId, Match.Maybe(String));
  check(customer, Match.Maybe({
    name: Match.Maybe(String),
    postalCode: Match.Maybe(String),
    phoneNumber: Match.Maybe(String),
    email: Match.Maybe(String),
  }));

  // Prepare HTTP request
  const endpoint = `${domainName}/api/v1/insert-customer`;
  const headers = { 'Content-Type': 'application/json' };
  if (authToken && authToken.trim().length > 0) {
    _.extend(headers, { 'X-Auth-Token': authToken.trim() });
  }
  if (userId && userId.trim().length > 0) {
    _.extend(headers, { 'X-User-Id': userId.trim() });
  }
  const data = Object.assign({}, customer);

  // Send HTTP request
  let result = '';
  try {
    result = HTTP.call('POST', endpoint, { headers, data });
  } catch (exc) {
    const { response } = exc;
    return {
      status: (response && response.statusCode) || '',
      data: (response && response.data) || {},
    };
  }

  // Process result
  const { statusCode: sc, data: d } = result;
  return {
    status: sc,
    data: d,
  };
};
//------------------------------------------------------------------------------
// CLEAR TEST DB
//------------------------------------------------------------------------------
TestAPI.clearTestDB = ({ domainName, authToken, userId }) => {
  // Check args
  check(domainName, String);
  check(authToken, Match.Maybe(String));
  check(userId, Match.Maybe(String));

  // Prepare HTTP request
  const endpoint = `${domainName}/api/v1/clear-test-db`;
  const headers = { 'Content-Type': 'application/json' };
  if (authToken && authToken.trim().length > 0) {
    _.extend(headers, { 'X-Auth-Token': authToken.trim() });
  }
  if (userId && userId.trim().length > 0) {
    _.extend(headers, { 'X-User-Id': userId.trim() });
  }

  // Send HTTP request
  let result = '';
  try {
    result = HTTP.call('POST', endpoint, { headers });
  } catch (exc) {
    const { response } = exc;
    return {
      status: (response && response.statusCode) || '',
      data: (response && response.data) || '',
    };
  }

  // Process result
  const { statusCode: sc, data: d } = result;
  return {
    status: sc,
    data: d,
  };
};
//------------------------------------------------------------------------------
// LOGOUT
//------------------------------------------------------------------------------
// curl http://localhost:3000/api/v1/logout -X POST -H "X-Auth-Token: GYG4QxtEanyD7xSqac8eJKFKjHO-4PMfsEpF_6eQyof" -H "X-User-Id: GeN6cS5m7boGzWE9y"
TestAPI.logout = ({ domainName, authToken, userId }) => {
  // Check args
  check(domainName, String);
  check(authToken, Match.Maybe(String));
  check(userId, Match.Maybe(String));

  // Prepare HTTP request
  const endpoint = `${domainName}/api/v1/logout`;
  const headers = {};
  if (authToken && authToken.trim().length > 0) {
    _.extend(headers, { 'X-Auth-Token': authToken.trim() });
  }
  if (userId && userId.trim().length > 0) {
    _.extend(headers, { 'X-User-Id': userId.trim() });
  }

  // Send HTTP request
  let result = '';
  try {
    result = HTTP.call('POST', endpoint, { headers });
  } catch (exc) {
    const { response } = exc;
    return {
      status: (response && response.statusCode) || '',
      data: (response && response.data) || '',
    };
  }

  // Process result
  const { statusCode: sc, data: d } = result;
  return {
    status: sc,
    data: d,
  };
};
//------------------------------------------------------------------------------

export default TestAPI;
