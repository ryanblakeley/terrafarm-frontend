import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import Layout from 'shared/components/Layout';
import { Form, TextInput } from 'shared/components/Form';
import { RaisedButton } from 'shared/components/Material';
import FormError from 'shared/components/FormError';
import AuthenticateUserMutation from '../mutations/AuthenticateUserMutation';
import classNames from '../styles/LoginFormStylesheet.css';

const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

function convertPhoneNumber (rawInput) {
  let phoneNumber = rawInput;

  phoneNumber = phoneNumber.replace(/[^\d+]+/g, '');
  // this chunk prefixes the phone number with '+1' but not sure if we want that
  // phoneNumber = phoneNumber.replace(/^00/, '+');
  // if (phoneNumber.match(/^1/)) phoneNumber = `+${phoneNumber}`;
  // if (!phoneNumber.match(/^\+/)) phoneNumber = `+1${phoneNumber}`;

  return phoneNumber;
}

const propTypes = {
  loginUser: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
};

class LoginForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: false,
      formData: {},
      canSubmit: false,
    };
  }
  handleValid = () => this.setState({ error: false, canSubmit: true });
  handleInvalid = () => this.setState({ canSubmit: false });
  handleSubmit = data => {
    this.setState({ formData: data });
    this.registerUser(data.userPhone);
  }
  handleComplete = response => {
    const { authenticateUser: { jwtToken } } = response;
    const jwtTokenDecoded = jwtDecode(jwtToken);

    if (jwtTokenDecoded && jwtTokenDecoded.user_id) {
      this.props.loginUser({ jwtToken, userId: jwtTokenDecoded.user_id });
    } else {
      this.setState({ error: 'Phone and/or password is incorrect' });
    }
  }
  handleError = error => { // eslint-disable-line no-unused-vars
    console.error('Error logging in:', error);
    this.setState({ error: 'Login failure' });
  }
  checkPhone = () => null
  loginUser = ({ userPhone, password }) => {
    const { relay } = this.props;

    AuthenticateUserMutation.commit(
      relay.environment,
      { userPhone, password },
      this.handleComplete,
      this.handleError,
    );
  }
  render () {
    const { error, canSubmit } = this.state;

    return (
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.loginUser}
      >
        <div className={classNames.form}>
          <TextInput
            label={'Phone number'}
            name={'userPhone'}
            onChange={this.checkPhone}
            validations={{ matchRegexp: PHONE_REGEX }}
            validationError={'Does not look like a phone number'}
            convertValue={convertPhoneNumber}
            required
          />
          <TextInput
            type={'password'}
            name={'password'}
            label={'Password'}
            validationError={'A password is required'}
            required
          />
          { error && <FormError text={error} /> }
          <Layout center topSmall >
            <RaisedButton
              type={'submit'}
              label={'Submit'}
              disabled={!canSubmit}
              fullWidth
            />
          </Layout>
        </div>
      </Form>
    );
  }
}

LoginForm.propTypes = propTypes;

export default LoginForm;
/*
          <TextInput
            type={'email'}
            name={'email'}
            label={'Email'}
            validations={'isEmail'}
            validationError={'A valid email is required'}
            required
          />
          <TextInput
            type={'password'}
            name={'password'}
            label={'Password'}
            validationError={'A password is required'}
            required
          />
*/
