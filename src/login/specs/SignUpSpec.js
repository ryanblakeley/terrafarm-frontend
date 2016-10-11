import { expect } from 'chai';
import { shallow } from 'enzyme';
import React, { PropTypes } from 'react';
import sinon from 'sinon';

import SignUp from 'login/components/SignUp';

describe('<SignUp />', () => {
  const comp = shallow(<SignUp loginUser={() => 'foo'} />);

  describe('.propTypes', () => {
    it('should have the right propTypes', () => {
      expect(SignUp.propTypes.loginUser).to.eql(PropTypes.func.isRequired);
    });
  });

  describe('default state', () => {
    const signup = new SignUp();

    describe('canSubmit', () => {
      it('should be false', () => {
        expect(signup.state.canSubmit).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    describe('signUpError', () => {
      it('should be null', () => {
        expect(signup.state.signUpError).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });

    describe('popoverOpen', () => {
      it('should be false', () => {
        expect(signup.state.popoverOpen).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    describe('popoverAnchor', () => {
      it('should be null', () => {
        expect(signup.state.popoverAnchor).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });

    describe('passwordLengthValid', () => {
      it('should be false', () => {
        expect(signup.state.passwordLengthValid).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    describe('passwordStrengthValid', () => {
      it('should be false', () => {
        expect(signup.state.passwordStrengthValid).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('#signUpUser', () => {
    const loginUser = sinon.stub();
    const signup = shallow(<SignUp loginUser={loginUser} />);

    context('when signup fails', () => {
      it('sets the signUpError state', () => {
        const data = { token: 'foo', id: null };
        const response = { createUser: { output: JSON.stringify(data) } };
        signup.instance().processSignUp(response);
        expect(signup.state().signUpError).to.eql('There was an error signing you up.');
        expect(loginUser.called).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    context('when signup succeeds', () => {
      it('calls the loginUser function with the token', () => {
        const data = { token: 'foo', id: 'bar' };
        const response = { createUser: { output: JSON.stringify(data) } };
        signup.instance().processSignUp(response);
        expect(loginUser.calledWith(data)).to.be.true; //eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('#handleFailure', () => {
    const loginUser = sinon.stub();
    const signup = shallow(<SignUp loginUser={loginUser} />);

    it('sets the error message', () => {
      signup.instance().handleFailure();
      expect(signup.state('signUpError')).to.eql('User already exists!');
    });
  });

  describe('#handleValid', () => {
    it('sets canSubmit to true', () => {
      comp.instance().handleValid();
      expect(comp.state().canSubmit).to.be.true; // eslint-disable-line no-unused-expressions
    });
  });

  describe('#handleInvalid', () => {
    // Let's set the state to true so we know this is working right
    comp.setState({ canSubmit: true });

    it('sets canSubmit to false', () => {
      comp.instance().handleInvalid();
      expect(comp.state().canSubmit).to.be.false; // eslint-disable-line no-unused-expressions
    });
  });

  describe('#closePopover', () => {
    before(() => {
      comp.setState({ popoverOpen: true });
    });

    it('closes the popover', () => {
      comp.instance().closePopover();
      expect(comp.state().popoverOpen).to.be.false; // eslint-disable-line no-unused-expressions
    });
  });

  describe('#openPopover', () => {
    before(() => {
      comp.setState({ popoverOpen: false, popoverAnchor: null });
    });

    after(() => {
      comp.setState({ popoverOpen: false, popoverAnchor: null });
    });

    it('sets the states properly', () => {
      comp.instance().openPopover({ target: 'foo' });
      expect(comp.state().popoverOpen).to.be.true; // eslint-disable-line no-unused-expressions
      expect(comp.state().popoverAnchor).to.eql('foo');
    });
  });

  describe('#lengthCheckIcon', () => {
    context('when the password length is valid', () => {
      before(() => {
        comp.setState({ passwordLengthValid: true });
      });

      after(() => {
        comp.setState({ passwordLengthValid: false });
      });

      it('returns a green check icon', () => {
        const result = comp.instance().lengthCheckIcon();
        expect(result.type.name).to.eql('IoIosCheckmarkOutline');
      });
    });

    context('when the password length is not valid', () => {
      before(() => {
        comp.setState({ passwordLengthValid: false });
      });

      after(() => {
        comp.setState({ passwordLengthValid: false });
      });

      it('returns a red x icon', () => {
        const result = comp.instance().lengthCheckIcon();
        expect(result.type.name).to.eql('IoIosCloseOutline');
      });
    });
  });

  describe('#strengthCheckIcon', () => {
    context('when the password strength is valid', () => {
      before(() => {
        comp.setState({ passwordStrengthValid: true });
      });

      after(() => {
        comp.setState({ passwordStrengthValid: false });
      });

      it('returns a green check icon', () => {
        const result = comp.instance().strengthCheckIcon();
        expect(result.type.name).to.eql('IoIosCheckmarkOutline');
      });

    });

    context('when the password strength is not valid', () => {
      before(() => {
        comp.setState({ passwordStrengthValid: false });
      });

      after(() => {
        comp.setState({ passwordStrengthValid: false });
      });

      it('returns a red x icon', () => {
        const result = comp.instance().strengthCheckIcon();
        expect(result.type.name).to.eql('IoIosCloseOutline');
      });

    });
  });

  describe('#checkPassword', () => {
    context('when the length is not valid', () => {
      it('properly sets the state', () => {
        const ev = {
          target: {
            value: 'a1',
          },
        };

        comp.instance().checkPassword(ev);
        expect(comp.state().passwordLengthValid).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    context('when the strength is not valid', () => {
      it('properly sets the state', () => {
        const ev = {
          target: {
            value: 'aaaaaaa',
          },
        };

        comp.instance().checkPassword(ev);
        expect(comp.state().passwordStrengthValid).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    context('when the length and strength are valid', () => {
      it('properly sets the state', () => {
        const ev = {
          target: {
            value: 'abc123',
          },
        };

        comp.instance().checkPassword(ev);
        expect(comp.state().passwordStrengthValid).to.be.true; // eslint-disable-line no-unused-expressions
        expect(comp.state().passwordLengthValid).to.be.true; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('#render', () => {
    it('renders the proper inputs', () => {
      expect(comp.find('TextInput').length).to.eql(3);
    });

    context('when canSubmit is false', () => {
      before(() => {
        comp.setState({ canSubmit: false });
      });

      it('sets the button to disabled', () => {
        expect(comp.find('RaisedButton').props().disabled).to.be.true; // eslint-disable-line no-unused-expressions
      });
    });

    context('when canSubmit is true', () => {
      before(() => {
        comp.setState({ canSubmit: true });
      });

      after(() => {
        comp.setState({ canSubmit: false });
      });

      it('sets the button to not disabled', () => {
        expect(comp.find('RaisedButton').props().disabled).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    context('when there is a signUp error', () => {
      before(() => {
        comp.setState({ signUpError: 'Bad error' });
      });

      after(() => {
        comp.setState({ signUpError: null });
      });

      it('displays the error message', () => {
        expect(comp.find('div')).to.have.length(2);
      });
    });

    context('when there is not a signUp error', () => {
      before(() => {
        comp.setState({ signUpError: null });
      });

      it('does not display the error message', () => {
        expect(comp.find('div')).to.have.length(1);
      });
    });
  });
});
