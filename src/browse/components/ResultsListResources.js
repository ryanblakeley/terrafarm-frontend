import React from 'react';
import Relay from 'react-relay';
import ResultsItemResource from './ResultsItemResource';

import classNames from '../styles/ResultsListResourcesStylesheet.css';

const ResultsListResources = props => <div className={classNames.this} >
  {props.master.resources.edges.map((edge, index) => <ResultsItemResource
    resource={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListResources.propTypes = {
  master: React.PropTypes.object,
};

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
