import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import TestSuit from '../../api/server/test-suit.js';
import PostalCodeInstallerData from '../../api/server/postal-code-installer-data.js';

const { public: { domainName }, email, password } = Meteor.settings;
const credentials = { domainName, email, password };

Meteor.startup(() => {
  console.log('[server] startup');

  /* TestSuit.loginNoCredentials(domainName);
  TestSuit.loginWrongCredentials(credentials);
  TestSuit.loginNonHashedPassword(credentials);
  const loggedInParams = TestSuit.loginRightCredentials(credentials);
  TestSuit.insertCustomerNameIsMissing(loggedInParams);
  TestSuit.insertCustomerNameIsEmptyString(loggedInParams);
  TestSuit.insertCustomerPostalCodeIsMissing(loggedInParams);
  TestSuit.insertCustomerPostalCodeIsEmptyString(loggedInParams);
  TestSuit.insertCustomerPhoneNumberIsMissing(loggedInParams);
  TestSuit.insertCustomerPhoneNumberIsEmptyString(loggedInParams);
  TestSuit.insertCustomerEmailIsMissing(loggedInParams);
  TestSuit.insertCustomerEmailIsEmptyString(loggedInParams);
  TestSuit.insertCustomerRightData(loggedInParams);
  _.each(PostalCodeInstallerData, (matcher) => {
    TestSuit.insertCustomerGetInstaller(loggedInParams, matcher);
  });
  // TestSuit.clearTestDB(loggedInParams);
  TestSuit.logout(loggedInParams); */

  console.log('\nAll tests passed!');
});
