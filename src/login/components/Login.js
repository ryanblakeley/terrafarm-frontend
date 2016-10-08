// Vendor
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import TextInput from 'shared/components/TextInput';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/lib/raised-button';

// Local
import AuthenticateUserMutation from '../mutations/AuthenticateUserMutation';

// Styles
import classNames from '../styles/LoginPageStylesheet.css';

export default class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired
  };
  state = {
    canSubmit: false,
    loginError: null
  };
  processLogin = (response) => {
    const { authenticateUser: { output } } = response;

    if (output) {
      this.props.loginUser(output);
    } else {
      this.setState({ loginError: 'Email and/or Password is incorrect' });
    }
  }
  loginUser = ({ email, password }) => {
    Relay.Store.commitUpdate(
      new AuthenticateUserMutation({ email, password }),
      { onSuccess: this.processLogin }
    );
  }
  handleValid = () => this.setState({ canSubmit: true });
  handleInvalid = () => this.setState({ canSubmit: false });
  render() {
    const { loginError, canSubmit } = this.state;

    return (
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.loginUser}
      >
        <div className={classNames.login}>
          <TextInput
            type='email'
            label='Email'
            name='email'
            validations='isEmail'
            validationError='A valid email is required'
          />
          <TextInput
            type='password'
            name='password'
            label='Password'
            validationError='A password is required'
            required
          />
          { loginError &&
            <div className={classNames.error}>{loginError}</div>
          }
          <RaisedButton
            style={{ width: '256px', marginTop: '5px' }}
            disabled={!canSubmit}
            type='submit'
          >
            Sign In
          </RaisedButton>
        </div>
      </Formsy.Form>
    );
  }
}
