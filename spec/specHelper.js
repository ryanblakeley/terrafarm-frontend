import requireHacker from 'require-hacker';

const fakeComponentString = `
  require('react').createClass({
    render() {
      return null;
    }
  })
`;

// Webpack Mocks
//
// This is needed so that we can mock out an SVG during testing
requireHacker.hook('svg', path => `module.exports = ${fakeComponentString}`);
// This is needed so that we can mock out CSS during testing
requireHacker.hook('css', path => `module.exports = ${fakeComponentString}`);
// This is needed so that we can mock out a PNG during testing
requireHacker.hook('png', path => `module.exports = ${fakeComponentString}`);
// End Webpack Mocks
