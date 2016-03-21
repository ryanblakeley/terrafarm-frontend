import React from 'react';
import Relay from 'react-relay';
import ResultsListUsers from './ResultsListUsers';
import ResultsListLocations from './ResultsListLocations';
import ResultsListResources from './ResultsListResources';

import classNames from '../styles/ResultsListStylesheet.css';

class ResultsList extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  static contextTypes = {
    location: React.PropTypes.object,
  };
  state = {
    entities: '',
  };
  componentWillMount () {
    const {query} = this.context.location;

    this.handleQuery(query);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {query} = nextContext.location;

    this.handleQuery(query);
  }
  handleQuery (query) {
    const {entities} = query;

    this.setState({ entities });
  }
  renderItems () {
    const {master} = this.props;
    const {entities} = this.state;

    if (entities && entities.length) {
      if (entities.search('users') > -1) {
        return <ResultsListUsers master={master} />;
      } else if (entities.search('locations') > -1) {
        return <ResultsListLocations master={master} />;
      } else if (entities.search('resources') > -1) {
        return <ResultsListResources master={master} />;
      }
    }
  }
  render () {
    return <div className={classNames.this} >
      {this.renderItems()}
    </div>;
  }
}

export default Relay.createContainer(ResultsList, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${ResultsListUsers.getFragment('master')},
        ${ResultsListLocations.getFragment('master')},
        ${ResultsListResources.getFragment('master')},
      }
    `,
  },
});