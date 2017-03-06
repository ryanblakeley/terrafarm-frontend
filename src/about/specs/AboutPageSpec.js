/* eslint-disable no-unused-vars, no-unused-expressions */
import React, { PropTypes } from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Import the component that is NOT wrapped in a theme for testing
import { AboutPage } from 'about/components/AboutPage';

function renderContainer (props) {
  return shallow(
    <AboutPage {...props} />,
    {}
  );
}

describe('<AboutPage />', () => {
  describe('#render', () => {
    const container = renderContainer({});

    it('renders a SmallPage', () => {
      expect(container.find('SmallPage')).to.have.length(1);
    });

    it('renders a heading', () => {
      expect(container.find('H2')).to.have.length(1);
    });

    it('renders at least 1 subheading', () => {
      expect(container.find('H3')).to.have.length.above(1);
    });

    it('renders at least 1 paragraph', () => {
      expect(container.find('P')).to.have.length.above(1);
    });

    it('renders at least 1 link', () => {
      expect(container.find('A')).to.have.length.above(1);
    });
  });
});
