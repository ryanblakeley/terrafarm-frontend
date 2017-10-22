import { expect } from 'chai';
import { shallow } from 'enzyme';
import React, { PropTypes } from 'react';
import sinon from 'sinon';

import Login from 'login/components/LoginForm';

describe('<Login />', () => {
  const comp = shallow(<Login loginUser={() => 'foo'} />);

  describe('.propTypes', () => {
    it('should have the right propTypes', () => {
      expect(Login.propTypes.loginUser).to.eql(PropTypes.func.isRequired);
    });
  });

  describe('default state', () => {
    const login = new Login();

    describe('canSubmit', () => {
      it('should be false', () => {
        expect(login.state.canSubmit).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    describe('loginError', () => {
      it('should be null', () => {
        expect(login.state.loginError).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('#processLogin', () => {
    const loginUser = sinon.stub();
    const login = shallow(<Login loginUser={loginUser} />);

    context('when login fails', () => {
      it('sets the loginError state', () => {
        const data = { token: 'foo', id: null };
        const response = { authenticateUser: { output: JSON.stringify(data) } };
        login.instance().processLogin(response);
        expect(login.state().loginError).to.eql('Email and/or Password is incorrect');
        expect(loginUser.called).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });

    context('when login succeeds', () => {
      it('calls the loginUser function with the token', () => {
        const data = { token: 'foo', id: 'bar' };
        const response = { authenticateUser: { output: JSON.stringify(data) } };
        login.instance().processLogin(response);
        expect(loginUser.calledWith(data)).to.be.true; //eslint-disable-line no-unused-expressions
      });
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

  describe('#render', () => {
    it('renders the proper inputs', () => {
      expect(comp.find('TextInput').length).to.eql(2);
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

    context('when there is a login error', () => {
      before(() => {
        comp.setState({ loginError: 'Bad error' });
      });

      after(() => {
        comp.setState({ loginError: null });
      });

      it('displays the error message', () => {
        expect(comp.find('div')).to.have.length(2);
      });
    });

    context('when there is not a login error', () => {
      before(() => {
        comp.setState({ loginError: null });
      });

      it('does not display the error message', () => {
        expect(comp.find('div')).to.have.length(1);
      });
    });
  });
});