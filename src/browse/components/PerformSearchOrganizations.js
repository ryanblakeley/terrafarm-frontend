import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {parsePoint} from '../../shared/utils/parse-coords';

class PerformSearchOrganizations extends React.Component {
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
    const resultsSet = query.searchOrganizations.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      coords: parsePoint(edge.node.placeByPlaceId.coords),
      url: 'organization',
    }));

    this.changeRelayVars(location.query);
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchOrganizations = nextProps.query.searchOrganizations;
    const {location, setSearchResults} = this.context;
    const {searchResultIds} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const nextSearchResultIds = nextSearchOrganizations.edges.map(edge => edge.node.rowId);

    this.changeRelayVars(Object.assign(query, nextQuery));

    const difference = searchResultIds.length !== nextSearchResultIds.length
      || nextSearchResultIds.find(x => searchResultIds.indexOf(x) < 0)
      || searchResultIds.find(x => nextSearchResultIds.indexOf(x) < 0);

    if (difference) {
      setSearchResults(nextSearchOrganizations.edges.map(edge => ({
        rowId: edge.node.rowId,
        name: edge.node.name,
        coords: parsePoint(edge.node.placeByPlaceId.coords),
        url: 'organization',
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
    count: 5,
    search: '',
    bounds: '((42,-125),(49,-110))',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchOrganizations(first:$count,search:$search,bounds:$bounds) {
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
