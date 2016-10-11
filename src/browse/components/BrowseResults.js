import React from 'react';
import Relay from 'react-relay';
import ResultsList from './ResultsList';

import classNames from '../styles/BrowseResultsStylesheet.css';

const BrowseResults = props => <div className={classNames.this} >
  <ResultsList master={props.master} />
</div>;

BrowseResults.propTypes = {
  master: React.PropTypes.object,
};

export default Relay.createContainer(BrowseResults, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${ResultsList.getFragment('master')}
      }
    `,
  },
});
