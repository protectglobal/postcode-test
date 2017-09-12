import { Meteor } from 'meteor/meteor';
import TestSuit from '../../api/server/test-suit.js';

const { public: { domainName }, email, password } = Meteor.settings;
const params = { domainName, email, password };
const testPrefix = 'thisIsATest-nfw8ryw4r984rnfry4qS-';

Meteor.startup(() => {
  console.log('[server] startup');

  TestSuit.loginNoCredentials(domainName);
  TestSuit.loginWrongCredentials(params);
  TestSuit.loginNonHashedPassword(params);
  const loggedInParams = TestSuit.loginRightCredentials(params);
  TestSuit.insertCustomerNameIsMissing(loggedInParams, testPrefix);
  TestSuit.insertCustomerNameIsEmptyString(loggedInParams, testPrefix);
  TestSuit.insertCustomerPostalCodeIsMissing(loggedInParams, testPrefix);
  TestSuit.insertCustomerPostalCodeIsEmptyString(loggedInParams, testPrefix);
  TestSuit.insertCustomerPhoneNumberIsMissing(loggedInParams, testPrefix);
  TestSuit.insertCustomerPhoneNumberIsEmptyString(loggedInParams, testPrefix);
  TestSuit.insertCustomerEmailIsMissing(loggedInParams, testPrefix);
  TestSuit.insertCustomerEmailIsEmptyString(loggedInParams, testPrefix);
  TestSuit.insertCustomerRightData(loggedInParams, testPrefix);
  // TestSuit.clearTestDB(loggedInParams);
  TestSuit.logout(loggedInParams);

  console.log('\n\nAll tests passed!');
});
