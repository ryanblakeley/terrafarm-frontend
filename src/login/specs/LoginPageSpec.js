import { expect } from 'chai';
import { shallow } from 'enzyme';
import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import sinon from 'sinon';

import LoginPage from 'login/LoginPage';
import * as fetchers from 'shared/utils/fetch';

const replaceStub = sinon.stub();
const pushStub = sinon.stub();
const setLoggedInStub = sinon.stub();
const setUserIdStub = sinon.stub();

function renderComponent(loggedIn = false) {
  return shallow(
    <LoginPage
      viewer={{ foo: 'bar' }}
      master={{ bar: 1 }}
      children={{ none: null }}
    />,
    {
      context: {
        loggedIn: loggedIn,
        setLoggedIn: setLoggedInStub,
        setUserId: setUserIdStub,
        router: {
          replace: replaceStub,
          push: pushStub,
        },
      },
    }
  );
}

describe('<LoginPage />', () => {
  describe('.contextTypes', () => {
    it('should have the correct contextTypes', () => {
      expect(LoginPage.contextTypes).to.eql({
        router: PropTypes.object.isRequired,
        loggedIn: PropTypes.bool,
        setLoggedIn: PropTypes.func.isRequired,
        setUserId: PropTypes.func.isRequired,
      });
    });
  });

  describe('#componentDidMount', () => {
    context('when the user is already logged in', () => {
      after(() => {
        replaceStub.reset();
      });

      it('redirects to the profile page', () => {
        const component = renderComponent(true);
        component.instance().componentDidMount();
        expect(replaceStub.calledWith('/profile')).to.be.true; // eslint-disable-line no-unused-expressions
      });
    });

    context('when the user is not logged in', () => {
      after(() => {
        replaceStub.reset();
      });

      it('does not redirect to the profile page', () => {
        const component = renderComponent();
        component.instance().componentDidMount();
        expect(replaceStub.called).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('#loginUser', () => {
    const component = renderComponent();
    let injectStub;

    before(() => {
      localStorage.removeItem('id_token');
    });

    after(() => {
      pushStub.reset();
      setLoggedInStub.reset();
      setUserIdStub.reset();
      localStorage.removeItem('id_token');
    });

    it('does all the expected things', () => {
      component.instance().loginUser({ token: 'foo', id: 'bar' });
      expect(setLoggedInStub.calledWith(true)).to.be.true; // eslint-disable-line no-unused-expressions
      expect(setUserIdStub.calledWith('bar')).to.be.true; // eslint-disable-line no-unused-expressions
      expect(pushStub.calledWith('/profile')).to.be.true; // eslint-disable-line no-unused-expressions
      expect(localStorage.getItem('id_token')).to.eql('foo');
    });
  });

  describe('#render', () => {
    it('renders the proper elements', () => {
      const component = renderComponent();
      expect(component.find('Tabs')).to.have.length(1);
      expect(component.find('Tab')).to.have.length(2);
      expect(component.find('Login')).to.have.length(1);
      expect(component.find('SignUp')).to.have.length(1);
    });
  });
});
