import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';

class PerformSearchProducts extends React.Component {
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
    },
    searchResultIds: [],
  };
  componentWillMount () {
    const {query} = this.props;
    const {location, setSearchParams, setSearchResults} = this.context;
    const resultsSet = query.searchProducts.edges.map(edge => ({
      rowId: edge.node.rowId,
      name: edge.node.name,
      url: 'product',
    }));

    if (query.searchProducts.totalCount > this.state.relayVariables.count) {
      setSearchParams({count: query.searchProducts.totalCount});
      this.changeRelayVars(Object.assign(location.query, {
        count: Number(query.searchProducts.totalCount),
      }));
    }
    setSearchResults(resultsSet);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const nextSearchProducts = nextProps.query.searchProducts;
    const {location, setSearchParams, setSearchResults} = this.context;
    const {relayVariables, searchResultIds} = this.state;
    const {query} = location || {};
    const nextQuery = nextContext.location.query || {};
    const nextSearchResultIds = nextSearchProducts.edges.map(edge => edge.node.rowId);

    let nextVars;

    if (relayVariables.count !== nextSearchProducts.totalCount
      && nextSearchProducts.totalCount > 3) {
      setSearchParams({count: nextSearchProducts.totalCount});
      nextVars = Object.assign(nextQuery, {
        count: Number(nextSearchProducts.totalCount),
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
      setSearchResults(nextSearchProducts.edges.map(edge => ({
        rowId: edge.node.rowId,
        name: edge.node.name,
        url: 'product',
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

export default Relay.createContainer(PerformSearchProducts, {
  initialVariables: {
    count: 3,
    search: '',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchProducts(first:$count,search:$search) {
          totalCount,
          edges {
            node {
              name,
              rowId,
            }
          }
        },
      }
    `,
  },
});
