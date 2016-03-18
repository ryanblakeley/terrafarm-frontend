import React from 'react';
import Relay from 'react-relay';
import ResultsList from './ResultsList';

import classNames from '../styles/BrowseResultsStylesheet.css';

class BrowseResults extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {master} = this.props;

    return <div className={classNames.this} >
      <ResultsList master={master} />
    </div>;
  }
}

export default Relay.createContainer(BrowseResults, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${ResultsList.getFragment('master')}
      }
    `,
  },
});
