# Protect Global Test API app

## How to use it
1. open a terminal and run the Protect Global Admin app on port 3000 as usual;
2. open the test app settings.json file and setup your email and password
(the email and password you entered when registering for the Protect Global Admin app);
3. open a new terminal and run the test app on port 5000 as follows:
meteor --settings settings-test.json --port 5000
4. check the logs from the test app to see if all the tests were passed.

## Test Suit
At the moment the test app performs the following set of tests:
1. Log in: no credential
2. Log in: no access rights
3. Log in: right credentials
4. Log out
5. Insert Customer: name is missing
6. Insert Customer: post code is missing
7. Insert Customer: phone number code is missing
8. Insert Customer: email code is missing
9. Insert Customer: all values provided but wrong postalCode
10. Insert Customer: all values provided but wrong phoneNumber
11. Insert Customer: all values provided but wrong email
12. Insert Customer: all values are correct
