import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { EJSON } from 'meteor/ejson';
import Form from 'antd/lib/form'; // for js
import 'antd/lib/form/style/css'; // for css
import Input from 'antd/lib/input'; // for js
import 'antd/lib/input/style/css'; // for css
import Button from 'antd/lib/button'; // for js
import 'antd/lib/button/style/css'; // for css
import Icon from 'antd/lib/icon'; // for js
import 'antd/lib/icon/style/css'; // for css

const FormItem = Form.Item;
const { domainName } = Meteor.settings.public;

//------------------------------------------------------------------------------
// PAGE COMPONENT DEFINITION:
//------------------------------------------------------------------------------
/**
* @summary Contains all the 'Page' logic and takes care of view dispatching.
* Actions should be dispatched here and NOT in any child component!
*/
class HomePage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userEmail: '',
      userPassword: '',
      customerName: '',
      customerPostalCode: '',
      customerPhoneNumber: '',
      customerEmail: '',
      canSubmit: true,
      error: '',
      apiResponse: '',
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // Destruture
    const {
      userEmail,
      userPassword,
      customerName,
      customerPostalCode,
      customerPhoneNumber,
      customerEmail,
    } = this.state;

    // Disable submit button.
    this.setState({ canSubmit: false });

    // Clear previous API response.and error
    this.setState({ error: '', apiResponse: '' });

    // User email and password are required.
    if (!userEmail || userEmail.trim().length === 0 ||
        !userPassword || userPassword.trim().length === 0) {
      // Display error message.
      this.setState({ error: 'Please, enter your credentials, both email and password are required' });

      // Re-enable submit button
      this.setState({ canSubmit: true });
      return;
    }

    const curUser = {
      email: userEmail,
      password: userPassword,
    };

    const newCustomer = {
      name: customerName,
      postalCode: customerPostalCode,
      phoneNumber: customerPhoneNumber,
      email: customerEmail,
    };

    Meteor.call('insertCustomer', curUser, newCustomer, (err, res) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ apiResponse: res });
      }

      // Re-enable submit button
      this.setState({ canSubmit: true });
    });
  }

  render() {
    // Destructure
    const {
      userEmail,
      userPassword,
      customerName,
      customerPostalCode,
      customerPhoneNumber,
      customerEmail,
      canSubmit,
      error,
      apiResponse,
    } = this.state;

    return (
      <div className="p3">
        <Form onSubmit={this.handleSubmit} className="mb3">
          <h1>Enter your credentials:</h1>
          <FormItem>
            <Input
              type="text"
              addonBefore={<Icon type="mail" />}
              placeholder="User email"
              value={userEmail}
              onChange={(e) => { this.setState({ userEmail: e.nativeEvent.target.value }); }}
            />
          </FormItem>
          <FormItem>
            <Input
              type="password"
              addonBefore={<Icon type="lock" />}
              placeholder="User password"
              value={userPassword}
              onChange={(e) => { this.setState({ userPassword: e.nativeEvent.target.value }); }}
            />
          </FormItem>
          <hr />
          <h1>Insert new customer:</h1>
          <FormItem>
            <Input
              type="text"
              addonBefore={<Icon type="user" />}
              placeholder="Name"
              value={customerName}
              onChange={(e) => { this.setState({ customerName: e.nativeEvent.target.value }); }}
            />
          </FormItem>
          <FormItem>
            <Input
              type="text"
              addonBefore={<Icon type="home" />}
              placeholder="Postal code"
              value={customerPostalCode}
              onChange={(e) => { this.setState({ customerPostalCode: e.nativeEvent.target.value }); }}
            />
          </FormItem>
          <FormItem>
            <Input
              type="text"
              addonBefore={<Icon type="phone" />}
              placeholder="Phone number"
              value={customerPhoneNumber}
              onChange={(e) => { this.setState({ customerPhoneNumber: e.nativeEvent.target.value }); }}
            />
          </FormItem>
          <FormItem>
            <Input
              type="text"
              addonBefore={<Icon type="mail" />}
              placeholder="Email"
              value={customerEmail}
              onChange={(e) => { this.setState({ customerEmail: e.nativeEvent.target.value }); }}
            />
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit}
            size="large"
            loading={!canSubmit}
          >
            Send HTTP request
          </Button>
        </Form>
        <hr />
        <h1>API request login endpoint:</h1>
        <div className="terminal p1">
          {`>> curl ${domainName}/api/v1/login/ -d "email=${userEmail}&password=<sha-256-password>&hashed=true"`}
        </div>
        <h1>API request insert-customer endpoint:</h1>
        <div className="terminal p1">
          {`>> curl -H "Content-Type: application/json" -H "X-Auth-Token: ????"
          -H "X-User-Id: ????" -X POST -d '{
            "name":"${customerName || ''}",
            "postalCode":"${customerPostalCode || ''}",
            "phoneNumber": "${customerPhoneNumber || ''}",
            "email": "${customerEmail || ''}"
          }' ${domainName}/api/v1/insert-customer/`}
        </div>
        <h1>API response:</h1>
        <div className="terminal p1" style={{ minHeight: '34px' }}>
          {`>> ${(apiResponse && EJSON.stringify(apiResponse, { indent: true })) || error}`}
        </div>
      </div>
    );
  }
}

export default HomePage;
