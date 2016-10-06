// Vendor
import React, { Component, PropTypes } from 'react';
import TextInput from 'shared/components/TextInput';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/lib/raised-button';
import Popover from 'material-ui/lib/popover/popover';
import CircleCheck from 'react-icons/lib/io/ios-checkmark-outline';
import CircleX from 'react-icons/lib/io/ios-close-outline';

// Local
import { networkAddress } from 'shared/utils/network';
import { post } from 'shared/utils/fetch';

// Styles
import classNames from '../styles/LoginPageStylesheet.css';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}/;

export default class SignUp extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired
  };
  state = {
    canSubmit: false,
    signupError: null,
    popoverOpen: false,
    popoverAnchor: null,
    passwordLengthValid: false,
    passwordStrengthValid: false
  };
  signUpUser = (values) => {
    post({ url: 'signup', body: values }).then(response => {
      if (response.error) {
        this.setState({ loginError: response.error });
      } else {
        this.props.loginUser(response.token);
      }
    });
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
      return <CircleCheck style={{ color: 'green' }} />;
    } else return <CircleX style={{ color: 'red' }} />;
  }
  strengthCheckIcon = () => {
    if (this.state.passwordStrengthValid) {
      return <CircleCheck style={{ color: 'green' }} />;
    } else return <CircleX style={{ color: 'red' }} />;
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
      signupError,
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
        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <div className={classNames.password}>
            <h3 className={classNames.passheader}>Password must contain:</h3>
            <ul>
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
    )
  }
}
