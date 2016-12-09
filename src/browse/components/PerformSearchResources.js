import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {parsePoint} from '../../shared/utils/parse-coords';

class PerformSearchResources extends React.Component {
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
      category: 'RAW_MATERIALS',
    },
    searchResultIds: [],
  };
  componentWillMount () {
    const {query} = this.props;
    const {location, setSearchParams, setSearchResults} = this.context;
    const resultsSet = query.searchResources.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      coords: parsePoint(edge.node.placeByPlaceId.coords),
      url: 'resource',
    }));

    if (query.searchResources.totalCount > this.state.relayVariables.count) {
      setSearchParams({count: query.searchResources.totalCount});
      this.changeRelayVars(Object.assign(location.query, {
        count: Number(query.searchResources.totalCount),
      }));
    }
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchResources = nextProps.query.searchResources;
    const {location, setSearchParams, setSearchResults} = this.context;
    const {relayVariables, searchResultIds} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const nextSearchResultIds = nextSearchResources.edges.map(edge => edge.node.rowId);

    let nextVars;

    if (relayVariables.count !== nextSearchResources.totalCount
      && nextSearchResources.totalCount > 3) {
      setSearchParams({count: nextSearchResources.totalCount});
      nextVars = Object.assign(nextQuery, {
        count: Number(nextSearchResources.totalCount),
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
      setSearchResults(nextSearchResources.edges.map(edge => ({
        rowId: edge.node.rowId,
        name: edge.node.name,
        coords: parsePoint(edge.node.placeByPlaceId.coords),
        url: 'resource',
      })));
      this.setState({searchResultIds: nextSearchResultIds});
    }
  }
  changeRelayVars = patch => {
    const {relay} = this.props;
    const {relayVariables} = this.state;
    // create object with only the params our relay query takes
    const newVariables = {
      search: patch.search || relayVariables.search,
      count: patch.count || relayVariables.count,
      bounds: patch.bounds || relayVariables.bounds,
      category: patch.category || relayVariables.category,
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

export default Relay.createContainer(PerformSearchResources, {
  initialVariables: {
    count: 3,
    search: '',
    bounds: '((23.850975392563722,-126.052734375),(51.594339962808384,-64.705078125))',
    category: 'RAW_MATERIALS',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchResources(first:$count,search:$search,bounds:$bounds,category:$category) {
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
