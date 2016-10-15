import React from 'react';
import Relay from 'react-relay';
import ResultsItemResource from './ResultsItemResource';

import classNames from '../styles/ResultsListResourcesStylesheet.css';

const ResultsListResources = props => <div className={classNames.this} >
  {props.query.allResources.edges.map((edge, index) => <ResultsItemResource
    resource={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListResources.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(ResultsListResources, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        allResources(first: 10) {
          edges {
            node {
              ${ResultsItemResource.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
