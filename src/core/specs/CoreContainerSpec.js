import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Import the component that is NOT wrapped in a theme for testing
import { CoreContainer } from 'core/CoreContainer';

function renderContainer(props, isActive) {
  const activeFunc = isActive || (() => false);

  return shallow(
    <CoreContainer {...props} />,
    {
      context: {
        router: {
          isActive: activeFunc
        }
      }
    }
  );
}

describe('<CoreContainer />', () => {
  // Test that we have the correct propTypes defined.
  describe('.propTypes', () => {
    describe('location', () => {
      it('should be an object', () => {
        expect(CoreContainer.propTypes.location).to.eq(PropTypes.object);
      });
    });

    describe('children', () => {
      it('should be an object', () => {
        expect(CoreContainer.propTypes.children).to.eq(PropTypes.object);
      });
    });
  });

  // Test that we have the correct contextTypes defined
  describe('.contextTypes', () => {
    describe('router', () => {
      it('should be a required object', () => {
        expect(CoreContainer.contextTypes.router).to.eq(PropTypes.object.isRequired);
      });
    });
  });

  // Test that we have the correct childContextTypes defined
  describe('.childContextTypes', () => {
    describe('router', () => {
      it('should be an object', () => {
        expect(CoreContainer.childContextTypes.router).to.eq(PropTypes.object);
      });
    });

    describe('location', () => {
      it('should be an object', () => {
        expect(CoreContainer.childContextTypes.location).to.eq(PropTypes.object);
      });
    });

    describe('loggedIn', () => {
      it('should be an boolean', () => {
        expect(CoreContainer.childContextTypes.loggedIn).to.eq(PropTypes.bool);
      });
    });

    describe('setLoggedIn', () => {
      it('should be a function', () => {
        expect(CoreContainer.childContextTypes.setLoggedIn).to.eq(PropTypes.func);
      });
    });

    describe('refresh', () => {
      it('should be a function', () => {
        expect(CoreContainer.childContextTypes.refresh).to.eq(PropTypes.func);
      });
    });
  });

  // Test that we initialize the component with the proper state
  describe('default state', () => {
    const container = new CoreContainer();

    describe('loggedIn', () => {
      it('should be false', () => {
        expect(container.state.loggedIn).to.be.false;
      });
    });

    describe('idToken', () => {
      it('should be null', () => {
        expect(container.state.idToken).to.be.null;
      });
    });
  });

  // Test that the proper context is returned from this method
  describe('#getChildContext', () => {
    const container = renderContainer({ location: { foo: 'Foo' } });

    it('returns the proper child context', () => {
      const expected = {
        router: { isActive: () => false },
        location: { foo: 'Foo' },
        loggedIn: false,
        setLoggedIn: (loggedIn) => container.instance().setLoggedIn(loggedIn),
        refresh: container.instance().forceRefresh
      };
      const context = container.instance().getChildContext();

      expect(context.router.isActive()).to.eql(expected.router.isActive());
      expect(context.location).to.eql(expected.location);
      expect(context.loggedIn).to.eql(expected.loggedIn);
      expect(context.setLoggedIn(false)).to.eql(expected.setLoggedIn(false));
      expect(context.refresh).to.eql(expected.refresh);
    });
  });

  // Test that the proper method is called when the component mounts
  // We don't actually need to mount the component here, nor do we
  // need to test the underlying implementation of the injectAuthToken
  // method, because that is tested later. We just want to know that
  // it was called
  describe('#componentWillMount', () => {
    const container = new CoreContainer();

    it('calls the injectAuthToken method', () => {
      const stub = sinon.stub(container, 'injectAuthToken');
      container.componentWillMount();
      expect(stub.called).to.be.true;
    });
  });

  // Test the branching logic inside this method and use sinon again
  // to stub the injectAuthToken method and make sure it is only called
  // in the right circumstances
  describe('#componentWillUpdate', () => {
    context('when the idToken has changed', () => {
      it('calls the injectAuthToken method', () => {
        const container = new CoreContainer();
        const stub = sinon.stub(container, 'injectAuthToken');
        container.componentWillUpdate({}, { idToken: 'Foo' });
        expect(stub.called).to.be.true;
      });
    });

    context('when the idToken has not changed', () => {
      it('does not call the injectAuthToken method', () => {
        const container = new CoreContainer();
        const stub = sinon.stub(container, 'injectAuthToken');
        container.componentWillUpdate({}, { idToken: null });
        expect(stub.called).to.be.false;
      });
    });
  });

  describe('#getIdToken', () => {
    const container = new CoreContainer();

    it('returns the id_token key from localStorage', () => {
      localStorage.id_token = 'foo';
      expect(container.getIdToken()).to.eql('foo');
    });
  });

  describe('#setLoggedIn', () => {
    const container = renderContainer({ location: { foo: 'Foo' } });

    it('updates the loggedIn state with the argument passed in', () => {
      container.instance().setLoggedIn(true);
      expect(container.state('loggedIn')).to.be.true;
    });
  });

  describe('#getPageName', () => {
    context('when the profile page is active', () => {
      it('returns Profile', () => {
        const func = ({ pathname }) => pathname === '/profile';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Profile');
      });
    });

    context('when the browse page is active', () => {
      it('returns Browse', () => {
        const func = ({ pathname }) => pathname === '/browse';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Browse');
      });
    });

    context('when the land page is active', () => {
      it('returns Land', () => {
        const func = ({ pathname }) => pathname === '/land';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Land');
      });
    });

    context('when the project page is active', () => {
      it('returns Project', () => {
        const func = ({ pathname }) => pathname === '/project';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Project');
      });
    });

    context('when the task page is active', () => {
      it('returns Task', () => {
        const func = ({ pathname }) => pathname === '/task';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Task');
      });
    });

    context('when the resource page is active', () => {
      it('returns Resource', () => {
        const func = ({ pathname }) => pathname === '/resource';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Resource');
      });
    });

    context('when the user page is active', () => {
      it('returns User', () => {
        const func = ({ pathname }) => pathname === '/user';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('User');
      });
    });

    context('when the login page is active', () => {
      it('returns Login', () => {
        const func = ({ pathname }) => pathname === '/login';
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Login');
      });
    });

    context('when none of those pages is active', () => {
      it('returns Terrafarm', () => {
        const func = ({ pathname }) => false;
        const container = renderContainer({ location: { foo: 'Foo' } }, func);
        expect(container.instance().getPageName()).to.eql('Terrafarm');
      });
    });
  });

  describe('#forceRefresh', () => {
    const container = new CoreContainer();

    it('calls the injectAuthToken method', () => {
      const stub = sinon.stub(container, 'injectAuthToken');
      container.componentWillMount();
      expect(stub.called).to.be.true;
    });
  });

  describe('#injectAuthToken', () => {
    const container = renderContainer({ location: { foo: 'Foo' } });

    context('when the token exists', () => {
      localStorage.id_token = 'foo';
      const spy = sinon.spy(Relay, 'injectNetworkLayer');
      container.instance().injectAuthToken();

      it('sets the loggedIn state to true', () => {
        expect(container.state('loggedIn')).to.be.true;
      });

      it('injects a network layer', () => {
        expect(spy.called).to.be.true;
      });

      it('sets the idToken state to the token value', () => {
        expect(container.state('idToken')).to.eql('foo');
      });
    });
  });

  // Now that we've tested all the individual pieces of this component
  // it's time to test the actual rendering
  describe('#render', () => {
    const container = renderContainer({ location: { foo: 'Foo' } });

    it('renders an AppHeader', () => {
      expect(container.find('AppHeader')).to.have.length(1);
    });

    it('renders and AppFooter', () => {
      expect(container.find('AppFooter')).to.have.length(1);
    });
  });
});
