import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import FormError from '../../shared/components/FormError';
import AuthenticateUserMutation from '../mutations/AuthenticateUserMutation';
import classNames from '../styles/LoginFormStylesheet.css';

export default class LoginForm extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };
  state = {
    canSubmit: false,
    loginError: null,
  };
  processLogin = response => {
    const { authenticateUser: { authenticateUserResult } } = response;

    if (authenticateUserResult && authenticateUserResult.userId) {
      this.props.loginUser(authenticateUserResult);
    } else {
      this.setState({ loginError: 'Email and/or Password is incorrect' });
    }
  }
  loginUser = ({ email, password }) => {
    Relay.Store.commitUpdate(
      new AuthenticateUserMutation({ email, password }),
      {
        onSuccess: this.processLogin,
      }
    );
  }
  handleValid = () => this.setState({ canSubmit: true });
  handleInvalid = () => this.setState({ canSubmit: false });
  handleLoginFailure = _ => console.log('failure:', _);
  render () {
    const { loginError, canSubmit } = this.state;

    return (
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.loginUser}
      >
        <div className={classNames.form}>
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
          { loginError && <FormError text={loginError} /> }
          <div className={classNames.buttons}>
            <RaisedButton
              type={'submit'}
              label={'Submit'}
              disabled={!canSubmit}
              fullWidth
            />
          </div>
        </div>
      </Formsy.Form>
    );
  }
}
