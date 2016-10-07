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
        router: {
          replace: replaceStub,
          push: pushStub,
        },
      },
    }
  );
}

describe('<LoginPage />', () => {
  describe('.propTypes', () => {
    it('should have the right propTypes', () => {
      expect(LoginPage.propTypes).to.eql({
        viewer: PropTypes.object,
        master: PropTypes.object,
        children: PropTypes.object,
      });
    });
  });

  describe('.contextTypes', () => {
    it('should have the correct contextTypes', () => {
      expect(LoginPage.contextTypes).to.eql({
        router: PropTypes.object.isRequired,
        loggedIn: PropTypes.bool,
        setLoggedIn: PropTypes.func.isRequired,
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

  describe('#getIdToken', () => {
    before(() => {
      localStorage.setItem('id_token', 'foo');
    });

    after(() => {
      localStorage.removeItem('id_token');
    });

    it('returns the token from localStorage', () => {
      const login = new LoginPage();
      expect(login.getIdToken()).to.eql('foo');
    });
  });

  describe('#injectAuthToken', () => {
    const login = new LoginPage();

    context('when the token is set', () => {
      let spy;

      before(() => {
        localStorage.setItem('id_token', 'foo');
        spy = sinon.spy(Relay, 'injectNetworkLayer');
      });

      after(() => {
        localStorage.removeItem('id_token');
        spy.restore();
      });

      it('injects the network layer', () => {
        login.injectAuthToken();
        expect(spy.called).to.be.true; // eslint-disable-line no-unused-expressions
      });
    });

    context('when the token is not set', () => {
      let spy;

      before(() => {
        localStorage.removeItem('id_token');
        spy = sinon.spy(Relay, 'injectNetworkLayer');
      });

      after(() => {
        spy.restore();
      });

      it('does not inject the network layer', () => {
        login.injectAuthToken();
        expect(spy.called).to.be.false; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('#loginUser', () => {
    const component = renderComponent();
    let injectStub;

    before(() => {
      injectStub = sinon.stub(component.instance(), 'injectAuthToken');
      localStorage.removeItem('id_token');
    });

    after(() => {
      pushStub.reset();
      injectStub.restore();
      setLoggedInStub.reset();
      localStorage.removeItem('id_token');
    });

    it('does all the expected things', () => {
      component.instance().loginUser('foo');
      expect(injectStub.called).to.be.true; // eslint-disable-line no-unused-expressions
      expect(setLoggedInStub.calledWith(true)).to.be.true; // eslint-disable-line no-unused-expressions
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
