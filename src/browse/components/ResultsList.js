import React from 'react';
import Relay from 'react-relay';
import ResultsListUsers from './ResultsListUsers';
import ResultsListResources from './ResultsListResources';
import ResultsListOrganizations from './ResultsListOrganizations';
import ResultsListProjects from './ResultsListProjects';
import ResultsListTasks from './ResultsListTasks';
import classNames from '../styles/ResultsListStylesheet.css';

class ResultsList extends React.Component {
  static propTypes = {
    query: React.PropTypes.object,
  };
  static contextTypes = {
    location: React.PropTypes.object,
  };
  state = {
    objects: '',
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
    const {objects} = query;

    this.setState({ objects });
  }
  renderItems () {
    const {query} = this.props;
    const {objects} = this.state;

    if (objects && objects.length) {
      if (objects.search('users') > -1) {
        return <ResultsListUsers query={query} />;
      } else if (objects.search('resources') > -1) {
        return <ResultsListResources query={query} />;
      } else if (objects.search('organizations') > -1) {
        return <ResultsListOrganizations query={query} />;
      } else if (objects.search('projects') > -1) {
        return <ResultsListProjects query={query} />;
      } else if (objects.search('tasks') > -1) {
        return <ResultsListTasks query={query} />;
      }
    }
    return '';
  }
  render () {
    return <div className={classNames.this} >
      {this.renderItems()}
    </div>;
  }
}

export default Relay.createContainer(ResultsList, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        id,
        ${ResultsListUsers.getFragment('query')},
        ${ResultsListResources.getFragment('query')},
        ${ResultsListOrganizations.getFragment('query')},
        ${ResultsListProjects.getFragment('query')},
        ${ResultsListTasks.getFragment('query')},
      }
    `,
  },
});
