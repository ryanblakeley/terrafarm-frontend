import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import IoIosCheckmarkOutline from 'react-icons/lib/io/ios-checkmark-outline';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';
import TextInput from '../../shared/components/TextInput';
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

    if (authenticateUserResult.userId) {
      this.props.loginUser(authenticateUserResult);
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
  openPopover = event => {
    this.setState({
      popoverOpen: true,
      popoverAnchor: event.target,
    });
  }
  lengthCheckIcon = () => {
    if (this.state.passwordLengthValid) {
      return <IoIosCheckmarkOutline style={{ color: 'green' }} />;
    }
    return <IoIosCloseOutline style={{ color: 'red' }} />;
  }
  strengthCheckIcon = () => {
    if (this.state.passwordStrengthValid) {
      return <IoIosCheckmarkOutline style={{ color: 'green' }} />;
    }
    return <IoIosCloseOutline style={{ color: 'red' }} />;
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
      <Formsy.Form
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
          <div className={classNames.buttons}>
            <RaisedButton
              type={'submit'}
              label={'Sign Up'}
              disabled={!canSubmit}
              fullWidth
            />
          </div>
        </div>
      </Formsy.Form>
    );
  }
}
