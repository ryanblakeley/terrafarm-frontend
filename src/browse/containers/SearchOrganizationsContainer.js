import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {parsePoint} from 'shared/utils/parse-coords';

class PerformSearchOrganizations extends React.Component {
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
      count: 8,
      search: '',
      bounds: '((25.1613432,-125.1510156),(52.4802030,-65.9127343))',
    },
    searchResultIds: [],
  };
  componentWillMount () {
    const {query} = this.props;
    const {setSearchParams, setSearchResults} = this.context;
    const resultsSet = query.searchOrganizations.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      coords: parsePoint(edge.node.placeByPlaceId.coords),
      url: 'farm',
    }));

    if (query.searchOrganizations.totalCount > this.state.relayVariables.count) {
      setSearchParams({}, {loadMore: true});
    }
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchOrganizations = nextProps.query.searchOrganizations;
    const {location, setSearchParams, setSearchResults} = this.context;
    const {searchResultIds} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const loadMore = nextContext.location.state && nextContext.location.state.loadMore;
    const nextSearchResultIds = nextSearchOrganizations.edges.map(edge => edge.node.rowId);
    const nextVars = Object.assign(nextQuery, {
      count: Number(nextQuery.count),
    });

    this.changeRelayVars(Object.assign(query, nextVars));

    if (loadMore
      && nextQuery.count > nextSearchOrganizations.totalCount) {
      setSearchParams({}, {loadMore: false});
    }

    const difference = searchResultIds.length !== nextSearchResultIds.length
      || nextSearchResultIds.find(x => searchResultIds.indexOf(x) < 0)
      || searchResultIds.find(x => nextSearchResultIds.indexOf(x) < 0);

    if (difference) {
      setSearchResults(nextSearchOrganizations.edges.map(edge => ({
        rowId: edge.node.rowId,
        name: edge.node.name,
        coords: parsePoint(edge.node.placeByPlaceId.coords),
        url: 'farm',
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

export default Relay.createContainer(PerformSearchOrganizations, {
  initialVariables: {
    count: 8,
    search: '',
    bounds: '((25.1613432,-125.1510156),(52.4802030,-65.9127343))',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchOrganizations(first:$count,search:$search,bounds:$bounds) {
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
