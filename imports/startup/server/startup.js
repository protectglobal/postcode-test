import { Meteor } from 'meteor/meteor';
import TestSuit from '../../api/server/test-suit.js';

const { public: { domainName }, email, password } = Meteor.settings;
const params = { domainName, email, password };

Meteor.startup(() => {
  console.log('[server] startup');

  TestSuit.loginNoCredentials(domainName);
  TestSuit.loginWrongCredentials(params);
  TestSuit.loginNonHashedPassword(params);
  const loggedInParams = TestSuit.loginRightCredentials(params);
  TestSuit.insertCustomerNameIsMissing(loggedInParams);
  TestSuit.insertCustomerNameIsEmptyString(loggedInParams);
  TestSuit.insertCustomerPostalCodeIsMissing(loggedInParams);
  TestSuit.insertCustomerPostalCodeIsEmptyString(loggedInParams);
  TestSuit.insertCustomerPhoneNumberIsMissing(loggedInParams);
  TestSuit.insertCustomerPhoneNumberIsEmptyString(loggedInParams);
  TestSuit.insertCustomerEmailIsMissing(loggedInParams);
  TestSuit.insertCustomerEmailIsEmptyString(loggedInParams);
  TestSuit.insertCustomerRightData(loggedInParams);
  TestSuit.clearTestDB(loggedInParams);
  TestSuit.logout(loggedInParams);

  console.log('\n\nAll tests passed!');
});
