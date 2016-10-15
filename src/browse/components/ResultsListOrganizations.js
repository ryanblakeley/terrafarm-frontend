import React from 'react';
import Relay from 'react-relay';
import ResultsItemOrganization from './ResultsItemOrganization';

import classNames from '../styles/ResultsListOrganizationsStylesheet.css';

const ResultsListOrganizations = props => <div className={classNames.this} >
  {props.query.allOrganizations.edges.map((edge, index) => <ResultsItemOrganization
    organization={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListOrganizations.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(ResultsListOrganizations, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        allOrganizations(first: 10) {
          edges {
            node {
              ${ResultsItemOrganization.getFragment('organization')},
            }
          }
        },
      }
    `,
  },
});
