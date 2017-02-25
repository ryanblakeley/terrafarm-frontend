import React from 'react';
import Relay from 'react-relay';

class Container extends React.Component {
  static propTypes = {
    validateToken: React.PropTypes.object,
  };
  render () {
    const {validateToken} = this.props;
    return <div>{validateToken ? 'Token matched!' : 'No match'}</div>;
  }
}

export default Relay.createContainer(Container, {
  initialVariables: {
    distributionToken: null,
  },
  fragments: {
    validateToken: () => Relay.QL`
      fragment on Distribution {
        id,
        rowId,
        shareByShareId {
          productByProductId {
            organizationId,
          }
        }
      }
    `,
  },
});
