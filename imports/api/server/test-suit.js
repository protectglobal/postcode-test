import { expect, be } from 'meteor/practicalmeteor:chai';
import TestAPI from './test-api.js';

// Namespace
const TestSuit = {};

//------------------------------------------------------------------------------
// LOGIN NO CREDENTIALS:
//------------------------------------------------------------------------------
/**
* @param {string} - domainName in { http://localhost:3000, https://protect-global.com }
*/
TestSuit.loginNoCredentials = (domainName) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START loginNoCredentials');

  const res = TestAPI.loginNoCredentials(domainName);
  console.log(res);

  expect(
    res
  ).to.deep.equal({
    status: 401,
    data: {
      status: 'error',
      message: 'Unauthorized',
    },
  });
};
//------------------------------------------------------------------------------
// LOGIN WRONG CREDENTIALS:
//------------------------------------------------------------------------------
/**
* @param {object} - params = { domainName, email, password }
*/
TestSuit.loginWrongCredentials = (params) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START loginWrongCredentials');

  const res = TestAPI.loginWrongCredentials(params);
  console.log(res);

  expect(
    res
  ).to.deep.equal({
    status: 401,
    data: {
      status: 'error',
      message: 'Unauthorized',
    },
  });
};
//------------------------------------------------------------------------------
// LOGIN WRONG CREDENTIALS:
//------------------------------------------------------------------------------
/**
* @param {object} - params = { domainName, email, password }
*/
TestSuit.loginNonHashedPassword = (params) => {
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

  const res = TestAPI.loginNonHashedPassword(params);
  console.log(res);

  expect(
    res
  ).to.deep.equal({ // <--
    status: 500,
    authToken: '',
    userId: '',
  });
};
//------------------------------------------------------------------------------
// LOGIN RIGHT CREDENTIALS:
//------------------------------------------------------------------------------
/**
* @param {object} - params = { domainName, email, password }
*/
TestSuit.loginRightCredentials = (params) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START loginRightCredentials');

  const { status, authToken, userId } = TestAPI.loginRightCredentials(params);
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerNameIsMissing = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerNameIsMissing');

  // name is missing!
  const postalCode = 'WC2N 5DU';
  const phoneNumber = '01727 830398';
  const email = 'email@example.com';

  const customer = { postalCode, phoneNumber, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerNameIsEmptyString = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerNameIsEmptyString');

  const name = ''; // name is empty string!
  const postalCode = 'WC2N 5DU';
  const phoneNumber = '01727 830398';
  const email = 'email@example.com';

  const customer = { name, postalCode, phoneNumber, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerPostalCodeIsMissing = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPostalCodeIsMissing');

  const name = 'John Smith';
  // postalCode is missing!
  const phoneNumber = '01727 830398';
  const email = 'email@example.com';

  const customer = { name, phoneNumber, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerPostalCodeIsEmptyString = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPostalCodeIsEmptyString');

  const name = 'John Smith';
  const postalCode = ''; // postal code is empty string
  const phoneNumber = '01727 830398';
  const email = 'email@example.com';

  const customer = { name, postalCode, phoneNumber, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerPhoneNumberIsMissing = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPhoneNumberIsMissing');

  const name = 'John Smith';
  const postalCode = 'WC2N 5DU';
  // phoneNumber is missing!
  const email = 'email@example.com';

  const customer = { name, postalCode, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerPhoneNumberIsEmptyString = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerPhoneNumberIsEmptyString');

  const name = 'John Smith';
  const postalCode = 'WC2N 5DU';
  const phoneNumber = ''; // phone number is empty string!
  const email = 'email@example.com';

  const customer = { name, postalCode, phoneNumber, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerEmailIsMissing = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerEmailIsMissing');

  const name = 'John Smith';
  const postalCode = 'WC2N 5DU';
  const phoneNumber = '01727 830398';
  // email is missing!

  const customer = { name, postalCode, phoneNumber };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerEmailIsEmptyString = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerEmailIsEmptyString');

  const name = 'John Smith';
  const postalCode = 'WC2N 5DU';
  const phoneNumber = '01727 830398';
  const email = ''; // email is empty string!

  const customer = { name, postalCode, phoneNumber, email };
  const res = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(
    res
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
/**
* @param {object} - loggedInParams = { domainName, authToken, userId }
*/
TestSuit.insertCustomerRightData = (loggedInParams, testPrefix) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START insertCustomerRightData');

  const name = 'John Smith';
  const postalCode = 'WC2N 5DU';
  const phoneNumber = '01727 830398';
  const email = 'john@example.com';

  const customer = { name, postalCode, phoneNumber, email };
  const { status, data } = TestAPI.insertCustomer(Object.assign({}, loggedInParams, { customer }));

  expect(status).to.equal(200);
  expect(data.status).to.equal('success');
};
//------------------------------------------------------------------------------
// CLEAR DB:
//------------------------------------------------------------------------------
TestSuit.clearTestDB = (loggedInParams) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START clear test DB FIRST: remove test docs created by this test');

  const { status } = TestAPI.clearTestDB(Object.assign({}, loggedInParams));
  expect(status).to.equal(200);
};
//------------------------------------------------------------------------------
// CLEAR DB:
//------------------------------------------------------------------------------
TestSuit.logout = (loggedInParams) => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START logout');

  expect(
    TestAPI.logout(loggedInParams)
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

export default TestSuit;



/*
const TestSuit = () => {
  console.log('\n');
  console.log('**************');
  console.log('TEST START loginNoCredentials');

  expect(
    TestAPI.loginNoCredentials(domainName)
  ).to.deep.equal({
    status: 401,
    data: {
      status: 'error',
      message: 'Unauthorized',
    },
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START loginWrongCredentials');

  expect(
    TestAPI.loginWrongCredentials(params)
  ).to.deep.equal({
    status: 401,
    data: {
      status: 'error',
      message: 'Unauthorized',
    },
  });

  // DEV (FORCE HASH PASSWORD DISABLED)
  /// console.log('\n');
  console.log('**************');
  console.log('TEST START loginNonHashedPassword');
  console.log('TestAPI.loginNonHashedPassword(params)', TestAPI.loginNonHashedPassword(params));
  expect(
    TestAPI.loginNonHashedPassword(params)
  ).to.not.deep.equal({
    status: 500,
    authToken: '',
    userId: '',
  }); ///

  // PRODUCTION
  console.log('\n');
  console.log('**************');
  console.log('TEST START loginNonHashedPassword');
  console.log('TestAPI.loginNonHashedPassword(params)', TestAPI.loginNonHashedPassword(params));
  expect(
    TestAPI.loginNonHashedPassword(params)
  ).to.deep.equal({
    status: 500,
    authToken: '',
    userId: '',
  });

  console.log('\n');
  console.log('**************');
  console.log('TEST START loginRightCredentials');

  const { status, authToken, userId } = TestAPI.loginRightCredentials(params);
  console.log('status', status);
  console.log('authToken', authToken);
  console.log('userId', userId);

  expect(
    status
  ).to.equal(200);

  expect(
    authToken
  ).to.not.equal('');

  expect(
    userId
  ).to.not.equal('');

  const loggedInParams = { domainName, authToken, userId };

  //----------------------------------------------------------------------------
  // Insert Customer: some value is missing
  //----------------------------------------------------------------------------
  console.log('\n');
  console.log('**************');
  console.log('TEST START Insert Customer: some value is missing FIRST');

  // 1. insert a new page
  const firstTestGetNextEditablePage = {
    pageUrl: `http://www.${testPrefix}getNextEditablePageTest1.com`,
    type: 'oneLook',
    looks: [
      `http://www.${testPrefix}getNextEditablePageTest1FirstLook.com`,
      `http://www.${testPrefix}getNextEditablePageTest1SecondLook.com`,
    ],
    pieces: [
      {
        exact: 'y',
        preContextText: 'pre context',
        displayText: 'displayT ext',
        displayImage: `www.${testPrefix}displayImageTest1.com`,
        destinationUrl: `www.${testPrefix}displayImageTest1.com`,
      },
      {
        displayText: 'hola',
        displayImage: `www.${testPrefix}displayImageTest2.net`,
        destinationUrl: `www.${testPrefix}displayImageTest2.com`,
        price: '40',
        brand: 'adidos',
      },
    ],
  };
  TestAPI.insertCustomer(Object.assign({}, loggedInParams, { page: firstTestGetNextEditablePage }));
  // 2. set basicInfoBy by means of the saveLooksAndPieces endpoint
  // TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...firstTestGetNextEditablePage }))
  // _.extend(firstTestPage, { basicInfoBy: { name: 'someName' } });
  // TestAPI.updatePage(Object.assign({}, loggedInParams, { page: firstTestPage }));
  // 3. request if page is editable
	const firstTestGetNextEditablePageRes = TestAPI.getNextEditablePage(loggedInParams);
	console.log(firstTestGetNextEditablePageRes);
  expect(
    firstTestGetNextEditablePageRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // isPageEditable: already have the page and all the info.
  // 1) the page already exists, and the 'basicInfoBy' field is NOT empty

  console.log('\n');
  console.log('**************');
  console.log(`TEST START isPageEditable FIRST: isPageEditable: already have the page and all the info.
  1) the page already exists, and the \'basicInfoBy\' field is NOT empty`);

  // 1. insert a new page
  const firstTestPage = {
    pageUrl: `http://www.${testPrefix}insertNewPageTest1.com`,
    type: 'oneLook',
    looks: [
      `http://www.${testPrefix}insertNewPageTest1FirstLook.com`,
      `http://www.${testPrefix}insertNewPageTest1SecondLook.com`,
    ],
    pieces: [
      {
        exact: 'y',
        preContextText: 'pre context',
        displayText: 'displayT ext',
        displayImage: `www.${testPrefix}displayImageTest1.com`,
        destinationUrl: `www.${testPrefix}displayImageTest1.com`,
      },
      {
        displayText: 'hola',
        displayImage: `www.${testPrefix}displayImageTest2.net`,
        destinationUrl: `www.${testPrefix}displayImageTest2.com`,
        price: '40',
        brand: 'adidos',
      },
    ],
  };
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: firstTestPage }));
  // 2. set basicInfoBy by means of the saveLooksAndPieces endpoint
  TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...firstTestPage }))
  // _.extend(firstTestPage, { basicInfoBy: { name: 'someName' } });
  // TestAPI.updatePage(Object.assign({}, loggedInParams, { page: firstTestPage }));
  // 3. request if page is editable
  expect(
    TestAPI.isPageEditable(_.extend(loggedInParams, { pageUrl: firstTestPage.pageUrl }))
  ).to.deep.equal({
    status: 400,
    data: {
      status: 'fail',
      message: 'We already have the info for this page. Try another page?'
    }
  });

  //----------------------------------------------------------------------------
  // isPageEditable: already have the page, have the type 'other'.
  // 2) if the page already exists and type is NOT 'oneLook'

  console.log('\n');
  console.log('**************');
  console.log(`TEST START isPageEditable SECOND: isPageEditable: already have the page, have the type \'other\'.
  2) if the page already exists and type is NOT \'oneLook\'`);

  // 1. insert a new page
  const secondTestPage = {
    pageUrl: `http://www.${testPrefix}insertNewPageTest2.com`,
    type: 'other',
  };
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: secondTestPage }));
  // 2. request is page is editable
  expect(
    TestAPI.isPageEditable(Object.assign({}, loggedInParams, { pageUrl: secondTestPage.pageUrl }))
  ).to.deep.equal({
    status: 400,
    data: {
      status: 'fail',
      message: 'We already have the info for this page. Try another page?'
    }
  });

  //----------------------------------------------------------------------------
  // isPageEditable: already have the page, have the page 'oneLook', no 'basicInfoBy'.

  console.log('\n');
  console.log('**************');
  console.log('TEST START isPageEditable THIRD: isPageEditable: already have the page, have the page \'oneLook\', no \'basicInfoBy\'');

  // 1. insert a new page
  const thirdTestPage = {
    pageUrl: `http://www.${testPrefix}insertNewPageTest3.com`,
    type: 'oneLook',
  };
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: thirdTestPage }));
  // 2. set basicInfoBy to empty
  // _.extend(thirdTestPage, { basicInfoBy: {} });
  // TestAPI.updatePage(Object.assign({}, loggedInParams, { page: thirdTestPage }));
  // 3. request is page is editable
  const thirdTestPageRes = TestAPI.isPageEditable(Object.assign({}, loggedInParams, { pageUrl: thirdTestPage.pageUrl }));
  expect(
    thirdTestPageRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // isPageEditable: page doesn't exist.

  console.log('\n');
  console.log('**************');
  console.log('TEST START isPageEditable FOURTH: isPageEditable: page doesn\'t exist');

  const fourthTestPage = {
    pageUrl: `http://www.${testPrefix}thisPageDoesNotExistInDB.com`,
  };
  // 1. request is page is editable
  expect(
    TestAPI.isPageEditable(Object.assign({}, loggedInParams, { pageUrl: fourthTestPage.pageUrl }))
  ).to.deep.equal({
    status: 206,
    data: {
      status: 'success',
      message: 'Page doesn\'t exist'
    }
  });

  //----------------------------------------------------------------------------
  // isPageEditable: already have the page, but no 'type'.

  console.log('\n');
  console.log('**************');
  console.log('TEST START isPageEditable FIFTH: isPageEditable: already have the page, but no \'type\'');

  // 1. insert a new page
  const fifthTestPage = {
    pageUrl: `http://www.${testPrefix}insertNewPageTest5.com`,
    type: 'oneLook',
  };
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: fifthTestPage }));
  // 2. remove type
  _.extend(fifthTestPage, { type: '' });
  TestAPI.updatePage(Object.assign({}, loggedInParams, { page: fifthTestPage }));
  // 3. request is page is editable
  const fifthTestPageRes = TestAPI.isPageEditable(Object.assign({}, loggedInParams, { pageUrl: fifthTestPage.pageUrl }));
  expect(
    fifthTestPageRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // isPageEditable: .

  console.log('\n');
  console.log('**************');
  console.log(`TEST START isPageEditable SIXTH: if siteName exists in DB then return
  page exist when any of the following values are provided: http://siteName,
  https://www.siteName, https://siteName, https://siteName, www.siteName`);

  // 1. insert a new page
  const sixthTestDomainName = `${testPrefix}insertNewPageTest6.com`;
  const sixthTestPage = {
    pageUrl: `http://www.${sixthTestDomainName}`,
    type: 'oneLook',
  };
  const sixthTestSimilarPages = [
    sixthTestDomainName,
    `http://www.${sixthTestDomainName}`,
    `https://www.${sixthTestDomainName}`,
    `http://${sixthTestDomainName}`,
    `https://${sixthTestDomainName}`,
    `www.${sixthTestDomainName}`,
  ];
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: sixthTestPage }));
  // 2. remove type
  _.extend(sixthTestPage, { type: '' });
  TestAPI.updatePage(Object.assign({}, loggedInParams, { page: sixthTestPage }));
  // 3. Check that the given page is aditable for any of the possible formats
  // with and without protocol, with and without www-prefix.
  _.each(sixthTestSimilarPages, url => {
    const sixthTestPageRes = TestAPI.isPageEditable(Object.assign({}, loggedInParams, { pageUrl: url }));
    expect(
      sixthTestPageRes.status
    ).to.equal(200);
  });

  //----------------------------------------------------------------------------
  // updatePage: page doesn't exist.

  console.log('\n');
  console.log('**************');
  console.log('TEST START updatePage FIRST: updatePage: page doesn\'t exist');

  const firstTestUpdatePage = {
    pageUrl: `http://www.${testPrefix}thisOtherPageDoesNotExistInDBEither.com`,
    type: 'other',
    /// basicInfoBy: {
      name: 'John',
      id: '12312312',
    }, ///
  };
  // 1. insert page usign the update (actually upsert) endpoint
  const firstTestUpdatePageRes = TestAPI.updatePage(Object.assign({}, loggedInParams, { page: firstTestUpdatePage }));
  expect(
    firstTestUpdatePageRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // updatePage: page does exist, only update 'type'.

  console.log('\n');
  console.log('**************');
  console.log('TEST START updatePage SECOND: updatePage: page does exist, only update \'type\'');

  // 1. insert a new page
  const secondTestUpdatePage = {
    pageUrl: `http://www.${testPrefix}updatePageTest6.com`,
    type: 'oneLook',
  };
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: secondTestUpdatePage }));
  // 2. update type only
  _.extend(secondTestUpdatePage, { type: 'other' });
  const secondTestUpdatePageRes = TestAPI.updatePage(Object.assign({}, loggedInParams, { page: secondTestUpdatePage }));
  expect(
    secondTestUpdatePageRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // saveLooksAndPieces: save looks only.

  console.log('\n');
  console.log('**************');
  console.log('TEST START saveLooksAndPieces FIRST: saveLooksAndPieces: save looks only');

  // 1. insert a new page
  const firstTestLooksAndPieces = {
    pageUrl: `http://www.${testPrefix}looksAndPiecesTest1.com`,
    looks: [
      `http://www.${testPrefix}looksAndPiecesTestFirstLook.com`,
      `http://www.${testPrefix}looksAndPiecesTestSecondLook.com`,
    ],
  };
  // 2. try to save looks only (the app will complain because pieces is missing)
  const firstTestLooksAndPiecesRes = TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...firstTestLooksAndPieces }));
  expect(
    firstTestLooksAndPiecesRes.status
  ).to.equal(404);

  //----------------------------------------------------------------------------
  // saveLooksAndPieces: save pieces only.

  console.log('\n');
  console.log('**************');
  console.log('TEST START saveLooksAndPieces SECOND: saveLooksAndPieces: save pieces only');

  // 1. insert a new page
  const secondTestLooksAndPieces = {
    pageUrl: `http://www.${testPrefix}looksAndPiecesTest2.com`,
    pieces: [
      {
        exact: 'y',
        preContextText: 'pre context',
        displayText: 'displayT ext',
        displayImage: `www.${testPrefix}c4.com`,
        destinationUrl: `www.${testPrefix}c4.com`,
      },
      {
        displayText: 'hola',
        displayImage: `www.${testPrefix}jahskjda.net`,
        destinationUrl: `www.${testPrefix}c5.com`,
        price: '$40',
        salesPrice: '$50',
        brand: 'adidos',
      },
    ],
  };
  // 2. insert page so that it exist on DB
  // API SHOULD NOT COMPLAIN IF PAGE DOESN'T EXIST
  /// TestAPI.insertPage(Object.assign({}, loggedInParams, { page: {
    pageUrl: secondTestLooksAndPieces.pageUrl,
    type: 'oneLook',
  } })); ///
  // 3. save looks only
  const secondTestLooksAndPiecesRes = TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...secondTestLooksAndPieces }));
  expect(
    secondTestLooksAndPiecesRes.status
  ).to.equal(404);

  //----------------------------------------------------------------------------
  // saveLooksAndPieces: save both.

  console.log('\n');
  console.log('**************');
  console.log('TEST START saveLooksAndPieces THIRD: saveLooksAndPieces: save both looks and pieces');

  // 1. insert a new page
  const thirdTestLooksAndPieces = {
    pageUrl: `http://www.${testPrefix}looksAndPiecesTest3.com`,
    looks: [
      `http://www.${testPrefix}looksAndPiecesTestFirstLook.com`,
      `http://www.${testPrefix}looksAndPiecesTestSecondLook.com`,
    ],
    pieces: [
      {
        exact: 'y',
        preContextText: 'pre context',
        displayText: 'displayText',
        displayImage: `www.${testPrefix}c4.com`,
        destinationUrl: `www.${testPrefix}c4.com`,
      },
      {
        displayText: 'hola',
        displayImage: `www.${testPrefix}jahskjda.net`,
        destinationUrl: `www.${testPrefix}c5.com`,
        price: '40',
        brand: 'adidos',
      },
    ],
  };
  // 2. insert page so that it exist on DB
  // API SHOULD NOT COMPLAIN IF PAGE DOESN'T EXIST
  TestAPI.insertPage(Object.assign({}, loggedInParams, { page: {
    pageUrl: thirdTestLooksAndPieces.pageUrl,
    type: 'oneLook',
  } }));
  // 3. save looks and pieces
  const thirdTestLooksAndPiecesRes = TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...thirdTestLooksAndPieces }));
  console.log('thirdTestLooksAndPiecesRes.data.message', thirdTestLooksAndPiecesRes.data.message);
  expect(
    thirdTestLooksAndPiecesRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // saveLooksAndPieces: when page doesn't exist. (The code shouldn't complain.  that's fine).

  console.log('\n');
  console.log('**************');
  console.log(`TEST START saveLooksAndPieces FOURTH: saveLooksAndPieces: when
  page doesn\'t exist. (The code shouldn\'t complain. That\'s fine)`);

  // 1. insert a new page
  const fourthTestLooksAndPieces = {
    pageUrl: `http://www.${testPrefix}ontherPageThatDoesNotExist.com`,
    looks: [
      `http://www.${testPrefix}looksAndPiecesTestFirstLook.com`,
      `http://www.${testPrefix}looksAndPiecesTestSecondLook.com`,
    ],
    pieces: [
      {
        exact: 'y',
        preContextText: 'pre context',
        displayText: 'displayT ext',
        displayImage: `www.${testPrefix}c4.com`,
        destinationUrl: `www.${testPrefix}c4.com`,
      },
      {
        displayText: 'hola',
        displayImage: `www.${testPrefix}jahskjda.net`,
        destinationUrl: `www.${testPrefix}c5.com`,
        price: '40',
        brand: 'adidos',
      },
    ],
  };
  const fourthTestLooksAndPiecesRes = TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...fourthTestLooksAndPieces }));
  expect(
    fourthTestLooksAndPiecesRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // saveLooksAndPieces: when page doesn't exist. (The code shouldn't complain.  that's fine).

  console.log('\n');
  console.log('**************');
  console.log(`TEST START saveLooksAndPieces FIFTH: testing chrome extension`);

  // 1. insert a new page
  const fifthTestLooksAndPieces = {
    pageUrl: `http://www.${testPrefix}ontherPageThatDoesNotExist2.com`,
    looks: [
      null,
      null,
      `http://${testPrefix}rstyle.me/iA-n/cne2knf46w_`,
      `http://${testPrefix}rstyle.me/iA-n/cm659bf46w_`,
    ],
    pieces: [
      {
        exact: 'n',
        displayText: '',
        displayImage: `https://${testPrefix}c1.staticflickr.com/5/4194/34452439571_a8b12be38f_b.jpg`,
        destinationUrl: '',
        price: '',
        brand: '',
      },
      {
        exact: 'n',
        displayText: '',
        displayImage: `https://${testPrefix}c1.staticflickr.com/5/4181/34196731070_34456d1ce3_b.jpg`,
        destinationUrl: '',
      },
    ],
  };
  const fifthTestLooksAndPiecesRes = TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...fifthTestLooksAndPieces }));
  console.log('fifthTestLooksAndPiecesRes', fifthTestLooksAndPiecesRes);
  // console.log('fifthTestLooksAndPiecesRes.data.message', fifthTestLooksAndPiecesRes.data.message);
  expect(
    fifthTestLooksAndPiecesRes.status
  ).to.equal(500);

  //----------------------------------------------------------------------------
  // saveLooksAndPieces: when page doesn't exist. (The code shouldn't complain.  that's fine).

  console.log('\n');
  console.log('**************');
  console.log(`TEST START saveLooksAndPieces SIXTH: testing chrome extension`);

  // 1. insert a new page
  const sixthTestLooksAndPieces = {
    pageUrl: `http://www.${testPrefix}ontherPageThatDoesNotExist2.com`,
    looks: [
      // null,
      // null,
      `http://${testPrefix}rstyle.me/iA-n/cne2knf46w_`,
      `http://${testPrefix}rstyle.me/iA-n/cm659bf46w_`,
    ],
    pieces: [
      {
        exact: 'n',
        displayText: '',
        displayImage: `https://${testPrefix}c1.staticflickr.com/5/4194/34452439571_a8b12be38f_b.jpg`,
        destinationUrl: '',
        price: '',
        brand: '',
      },
      {
        exact: 'n',
        displayText: '',
        displayImage: `https://${testPrefix}c1.staticflickr.com/5/4181/34196731070_34456d1ce3_b.jpg`,
        destinationUrl: '',
      },
    ],
  };
  const sixthTestLooksAndPiecesRes = TestAPI.saveLooksAndPieces(Object.assign({}, loggedInParams, { ...sixthTestLooksAndPieces }));
  console.log('sixthTestLooksAndPiecesRes', sixthTestLooksAndPiecesRes);
  console.log('sixthTestLooksAndPiecesRes.data.message', sixthTestLooksAndPiecesRes.data.message);
  expect(
    sixthTestLooksAndPiecesRes.status
  ).to.equal(404);

  //----------------------------------------------------------------------------
  // clearTestDB:

  console.log('\n');
  console.log('**************');
  console.log('TEST START clear test DB FIRST: remove test docs created by this test');

  const firstTestClearTestDBRes = TestAPI.clearTestDB(Object.assign({}, loggedInParams));
  expect(
    firstTestClearTestDBRes.status
  ).to.equal(200);

  //----------------------------------------------------------------------------
  // Logout

  console.log('\n');
  console.log('**************');
  console.log('TEST START logout');

  expect(
    TestAPI.logout(loggedInParams)
  ).to.deep.equal({
    status: 200,
    data: {
      status: 'success',
      data: {
        message: 'You\'ve been logged out!'
      }
    }
  });

  // TODO: try to do some operation after logout using the old credentials?
};
*/
