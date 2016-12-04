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
    setSearchResults: React.PropTypes.func,
  };
  state = {
    relayVariables: {
      count: 5,
      search: '',
      bounds: '((23.850975392563722,-126.052734375),(51.594339962808384,-64.705078125))',
      category: 'LAND',
    },
    searchResultIds: [],
  };
  componentWillMount () {
    const {query} = this.props;
    const {location, setSearchResults} = this.context;
    const resultsSet = query.searchResources.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      coords: parsePoint(edge.node.placeByPlaceId.coords),
      url: 'resource',
    }));
    const newVars = Object.assign({
      category: this.state.relayVariables.category,
    }, location.query);

    this.changeRelayVars(newVars);
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchResources = nextProps.query.searchResources;
    const {location, setSearchResults} = this.context;
    const {searchResultIds, relayVariables} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const nextSearchResultIds = nextSearchResources.edges.map(edge => edge.node.rowId);
    const newVars = Object.assign({
      category: relayVariables.category,
    }, Object.assign(query, nextQuery));

    this.changeRelayVars(newVars);

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
    count: 5,
    search: '',
    bounds: '((23.850975392563722,-126.052734375),(51.594339962808384,-64.705078125))',
    category: 'LAND',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchResources(first:$count,search:$search,bounds:$bounds,category:$category) {
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
