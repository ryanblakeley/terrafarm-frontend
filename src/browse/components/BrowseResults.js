import React from 'react';
import Relay from 'react-relay';
import ResultsList from './ResultsList';

import classNames from '../styles/BrowseResultsStylesheet.css';

const BrowseResults = props => <div className={classNames.this} >
  <ResultsList query={props.query} />
</div>;

BrowseResults.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(BrowseResults, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        ${ResultsList.getFragment('query')}
      }
    `,
  },
});
