import React from 'react';
import Relay from 'react-relay';

import classNames from './styles/TEMPLATEContainer.css';

class TEMPLATEContainer extends React.Component {
  static propTypes = {
    aaa: React.PropTypes.string,
  };
  render () {
    return <div className={classNames.this}>
      <h2>TEMPLATE Container</h2>
    </div>;
  }
}

export default Relay.createContainer(TEMPLATEContainer, {
  fragments: {
    QUERY: () => Relay.QL`
      fragment on QUERY {
        edges {
          node {
            id,
            name,
          },
        },
      },
    `,
  },
});
