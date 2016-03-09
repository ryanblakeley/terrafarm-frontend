jest.dontMock('../CoreContainer');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import CoreContainer from '../CoreContainer';

describe('CoreContainer', function () {
  it(
    'it handles the auth token and passes the router and location into context',
    function () {
      const container = TestUtils.renderIntoDocument(<CoreContainer location children={null} />);

      expect(container.state.loggedIn).toBe(false);
    }
  );
});
