import React from 'react';
import Relay from 'react-relay';
import ResultsItemResource from './ResultsItemResource';

import classNames from '../styles/ResultsListResourcesStylesheet.css';

class ResultsListResources extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {resources} = this.props.master;

    return <div className={classNames.this} >
      {resources.edges.map((edge, index) => <ResultsItemResource
        resource={edge.node}
        index={index}
        key={index}
      />)}
    </div>;
  }
}

export default Relay.createContainer(ResultsListResources, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        resources(first: 2) {
          edges {
            node {
              id,
              name,
              ${ResultsItemResource.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});