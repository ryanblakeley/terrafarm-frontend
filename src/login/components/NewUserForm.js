import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import Layout from 'shared/components/Layout';
import { Form, TextInput } from 'shared/components/Form';
import { RaisedButton } from 'shared/components/Material';
import FormError from 'shared/components/FormError';
import RegisterUserMutation from '../mutations/RegisterUserMutation';
import classNames from '../styles/NewUserFormStylesheet.css';

const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

function convertPhoneNumber (rawInput) {
  let phoneNumber = rawInput;

  phoneNumber = phoneNumber.replace(/[^\d+]+/g, '');
  // phoneNumber = phoneNumber.replace(/^00/, '+');
  // if (phoneNumber.match(/^1/)) phoneNumber = `+${phoneNumber}`;
  // if (!phoneNumber.match(/^\+/)) phoneNumber = `+1${phoneNumber}`;

  return phoneNumber;
}

const propTypes = {
  loginUser: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
};

class NewUserForm extends React.Component {
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
    const { registerUser: { jwtToken } } = response;
    const jwtTokenDecoded = jwtDecode(jwtToken);

    if (jwtTokenDecoded && jwtTokenDecoded.user_id) {
      this.props.loginUser({ jwtToken, userId: jwtTokenDecoded.user_id });
    } else {
      this.setState({ error: 'There was an error signing you up.' });
    }
  }
  handleError = error => { // eslint-disable-line no-unused-vars
    this.setState({ error: 'User already exists!' });
  }
  checkPhone = () => null
  registerUser = ({ userPhone }) => {
    const { relay } = this.props;

    RegisterUserMutation.commit(
      relay.environment,
      { userPhone },
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
        onValidSubmit={this.registerUser}
      >
        <div className={classNames.form}>
          <TextInput
            label={'Phone number'}
            name={'userPhone'}
            onChange={this.checkPhone}
            validationError={'Does not look like a phone number'}
            validations={{ matchRegexp: PHONE_REGEX }}
            convertValue={convertPhoneNumber}
            required
          />
          { error && <FormError text={error} /> }
          <Layout center topSmall >
            <RaisedButton
              type={'submit'}
              label={'Sign Up'}
              disabled={!canSubmit}
              fullWidth
            />
          </Layout>
        </div>
      </Form>
    );
  }
}

NewUserForm.propTypes = propTypes;

export default NewUserForm;
/*
import { CloseIcon, CheckmarkIcon } from 'shared/components/Icons';
import { H3, UL, LI } from 'shared/components/Typography';
import { Popover } from 'shared/components/Material';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}/;
    state = {
      popoverOpen: false,
      popoverAnchor: null,
      passwordLengthValid: false,
      passwordStrengthValid: false,
    }

  closePopover = () => this.setState({ popoverOpen: false });
  openPopover = event => {
    this.setState({
      popoverOpen: true,
      popoverAnchor: event.target,
    });
  }
  lengthCheckIcon = () => {
    if (this.state.passwordLengthValid) {
      return <CheckmarkIcon style={{ color: 'green' }} />;
    }
    return <CloseIcon style={{ color: 'red' }} />;
  }
  strengthCheckIcon = () => {
    if (this.state.passwordStrengthValid) {
      return <CheckmarkIcon style={{ color: 'green' }} />;
    }
    return <CloseIcon style={{ color: 'red' }} />;
  }
  checkPassword = event => {
    const password = event.target.value;
    this.setState({
      passwordLengthValid: password.length > 5,
      passwordStrengthValid: !!password.match(/^(?=.*[a-zA-Z])(?=.*\d)/),
    });
  }

          <TextInput
            label={'Email'}
            type={'email'}
            name={'email'}
            validationError={'Please enter a valid email'}
            validations={'isEmail'}
            required
          />
          <TextInput
            label={'Password'}
            type={'password'}
            name={'password'}
            onChange={this.checkPassword}
            validationError={'Password does not meet the criteria'}
            validations={{ matchRegexp: PASSWORD_REGEX }}
            required
            onFocus={this.openPopover}
            onBlur={this.closePopover}
          />

          <Popover
            open={popoverOpen}
            anchorEl={popoverAnchor}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <div className={classNames.password}>
              <H3 className={classNames.passheader}>Password must contain</H3>
              <UL className={classNames.passwordlist}>
                <LI>{this.lengthCheckIcon()} 6 characters</LI>
                <LI>{this.strengthCheckIcon()} 1 letter and 1 number</LI>
              </UL>
            </div>
          </Popover>
*/
