import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {parsePoint} from '../../shared/utils/parse-coords';

class PerformSearchTasks extends React.Component {
  static propTypes = {
    query: React.PropTypes.object,
    relay: React.PropTypes.object,
  };
  static contextTypes = {
    location: React.PropTypes.object,
    setSearchResults: React.PropTypes.func,
  };
  state = {
    relayVariables: {
      count: 5,
      search: '',
      bounds: '((42,-125),(49,-110))',
    },
    searchResultIds: [],
  };
  componentWillMount () {
    const {query} = this.props;
    const {location, setSearchResults} = this.context;
    const resultsSet = query.searchTasks.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      coords: parsePoint(edge.node.placeByPlaceId.coords),
      url: 'task',
    }));

    this.changeRelayVars(location.query);
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchTasks = nextProps.query.searchTasks;
    const {location, setSearchResults} = this.context;
    const {searchResultIds} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const nextSearchResultIds = nextSearchTasks.edges.map(edge => edge.node.rowId);

    this.changeRelayVars(Object.assign(query, nextQuery));

    const difference = searchResultIds.length !== nextSearchResultIds.length
      || nextSearchResultIds.find(x => searchResultIds.indexOf(x) < 0)
      || searchResultIds.find(x => nextSearchResultIds.indexOf(x) < 0);

    if (difference) {
      setSearchResults(nextSearchTasks.edges.map(edge => ({
        rowId: edge.node.rowId,
        name: edge.node.name,
        coords: parsePoint(edge.node.placeByPlaceId.coords),
        url: 'task',
      })));
      this.setState({searchResultIds: nextSearchResultIds});
    }
  }
  changeRelayVars = patch => {
    const {relay} = this.props;
    const {relayVariables} = this.state;
    const newVariables = {
      search: patch.search || relayVariables.search,
      count: patch.count || relayVariables.count,
      bounds: patch.bounds || relayVariables.bounds,
    };

    if (!equal(relayVariables, newVariables)) {
      relay.setVariables(newVariables);
      this.setState({ relayVariables: newVariables });
    }
  }
  render () {
    return <div />;
  }
}

export default Relay.createContainer(PerformSearchTasks, {
  initialVariables: {
    count: 5,
    search: '',
    bounds: '((42,-125),(49,-110))',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchTasks(first:$count,search:$search,bounds:$bounds) {
          edges {
            node {
              name,
              rowId,
              placeByPlaceId {
                coords,
              },
            }
          }
        },
      }
    `,
  },
});