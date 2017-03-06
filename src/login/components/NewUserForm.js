import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Layout from 'shared/components/Layout';
import {H3, UL, LI} from 'shared/components/Typography';
import {Form, TextInput} from 'shared/components/Form';
import {RaisedButton, Popover} from 'shared/components/Material';
import {CloseIcon, CheckmarkIcon} from 'shared/components/Icons';
import FormError from 'shared/components/FormError';
import SignUpUserMutation from '../mutations/SignUpUserMutation';
import classNames from '../styles/NewUserFormStylesheet.css';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}/;

export default class NewUserForm extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };
  state = {
    canSubmit: false,
    signUpError: null,
    popoverOpen: false,
    popoverAnchor: null,
    passwordLengthValid: false,
    passwordStrengthValid: false,
  };
  processSignUp = response => {
    const { registerUser: { authenticateUserResult } } = response;

    if (authenticateUserResult && authenticateUserResult.userId) {
      this.props.loginUser(authenticateUserResult);
    } else {
      this.setState({ signUpError: 'There was an error signing you up.' });
    }
  }
  signUpUser = ({ name, email, password }) => {
    Relay.Store.commitUpdate(
      new SignUpUserMutation({ name, password, email }),
      { onSuccess: this.processSignUp, onFailure: this.handleFailure }
    );
  }
  handleFailure = () => {
    this.setState({ signUpError: 'User already exists!' });
  }
  handleValid = () => this.setState({ canSubmit: true });
  handleInvalid = () => this.setState({ canSubmit: false });
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
  render () {
    const {
      signUpError,
      canSubmit,
      popoverOpen,
      popoverAnchor,
    } = this.state;

    return (
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.signUpUser}
      >
        <div className={classNames.form}>
          <TextInput
            label={'Name'}
            name={'name'}
            validationError={'Please enter your name'}
            required
          />
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
          { signUpError && <FormError text={signUpError} /> }
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
          <Layout center topSmall>
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
