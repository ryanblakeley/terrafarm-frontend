// Vendor
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import TextInput from 'shared/components/TextInput';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/lib/raised-button';
import Popover from 'material-ui/lib/popover/popover';
import IoIosCheckmarkOutline from 'react-icons/lib/io/ios-checkmark-outline';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';

// Local
import SignUpUserMutation from '../mutations/SignUpUserMutation';

// Styles
import classNames from '../styles/LoginPageStylesheet.css';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}/;

export default class SignUp extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired
  };
  state = {
    canSubmit: false,
    signUpError: null,
    popoverOpen: false,
    popoverAnchor: null,
    passwordLengthValid: false,
    passwordStrengthValid: false
  };
  processSignUp = (response) => {
    const { createUser: { output } } = response;

    if (output) {
      this.props.loginUser(output);
    } else {
      this.setState({ signUpError: 'There was an error signing you up.' });
    }
  }
  handleFailure = () => {
    this.setState({ signUpError: 'User already exists!' });
  }
  signUpUser = ({ name, email, password }) => {
    Relay.Store.commitUpdate(
      new SignUpUserMutation({ name, password, email }),
      { onSuccess: this.processSignUp, onFailure: this.handleFailure }
    );
  }
  handleValid = () => this.setState({ canSubmit: true });
  handleInvalid = () => this.setState({ canSubmit: false });
  closePopover = () => this.setState({ popoverOpen: false });
  openPopover = (ev) => {
    this.setState({
      popoverOpen: true,
      popoverAnchor: ev.target
    });
  }
  lengthCheckIcon = () => {
    if (this.state.passwordLengthValid) {
      return <IoIosCheckmarkOutline style={{ color: 'green' }} />;
    } else return <IoIosCloseOutline style={{ color: 'red' }} />;
  }
  strengthCheckIcon = () => {
    if (this.state.passwordStrengthValid) {
      return <IoIosCheckmarkOutline style={{ color: 'green' }} />;
    } else return <IoIosCloseOutline style={{ color: 'red' }} />;
  }
  checkPassword = (ev) => {
    const password = ev.target.value;
    this.setState({
      passwordLengthValid: password.length > 5,
      passwordStrengthValid: !!password.match(/^(?=.*[a-zA-Z])(?=.*\d)/)
    });
  }
  render() {
    const {
      signUpError,
      canSubmit,
      popoverOpen,
      popoverAnchor
    } = this.state;

    return (
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.signUpUser}
      >
        <TextInput
          label='Name'
          name='name'
          validationError='Please enter your name'
          required
        />
        <TextInput
          label='Email'
          type='email'
          name='email'
          validationError='Please enter a valid email'
          validations='isEmail'
        />
        <TextInput
          label='Password'
          type='password'
          name='password'
          onChange={this.checkPassword}
          validationError='Password does not meet the criteria'
          validations={{ matchRegexp: PASSWORD_REGEX }}
          onFocus={this.openPopover}
          onBlur={this.closePopover}
        />
        { signUpError &&
          <div className={classNames.error}>{signUpError}</div>
        }
        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <div className={classNames.password}>
            <h3 className={classNames.passheader}>Password must contain</h3>
            <ul className={classNames.passwordlist}>
              <li>{this.lengthCheckIcon()} 6 characters</li>
              <li>{this.strengthCheckIcon()} 1 letter and 1 number</li>
            </ul>
          </div>
        </Popover>
        <RaisedButton
          style={{ width: '256px', marginTop: '15px' }}
          disabled={!canSubmit}
          type='submit'
        >
          Sign Up
        </RaisedButton>
      </Formsy.Form>
    );
  }
}
