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
    setSearchParams: React.PropTypes.func,
    setSearchResults: React.PropTypes.func,
  };
  state = {
    relayVariables: {
      count: 3,
      search: '',
      bounds: '((23.850975392563722,-126.052734375),(51.594339962808384,-64.705078125))',
    },
    searchResultIds: [],
  };
  componentWillMount () {
    const {query} = this.props;
    const {location, setSearchParams, setSearchResults} = this.context;
    const resultsSet = query.searchTasks.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      coords: parsePoint(edge.node.placeByPlaceId.coords),
      url: 'task',
    }));

    if (query.searchTasks.totalCount > this.state.relayVariables.count) {
      setSearchParams({count: query.searchTasks.totalCount});
      this.changeRelayVars(Object.assign(location.query, {
        count: Number(query.searchTasks.totalCount),
      }));
    }
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchTasks = nextProps.query.searchTasks;
    const {location, setSearchParams, setSearchResults} = this.context;
    const {relayVariables, searchResultIds} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const nextSearchResultIds = nextSearchTasks.edges.map(edge => edge.node.rowId);

    let nextVars;

    if (relayVariables.count !== nextSearchTasks.totalCount
      && nextSearchTasks.totalCount > 3) {
      setSearchParams({count: nextSearchTasks.totalCount});
      nextVars = Object.assign(nextQuery, {
        count: Number(nextSearchTasks.totalCount),
      });
    } else {
      nextVars = Object.assign(nextQuery, {
        count: Number(nextQuery.count),
      });
    }

    this.changeRelayVars(Object.assign(query, nextVars));

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
    count: 3,
    search: '',
    bounds: '((23.850975392563722,-126.052734375),(51.594339962808384,-64.705078125))',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchTasks(first:$count,search:$search,bounds:$bounds) {
          totalCount,
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
