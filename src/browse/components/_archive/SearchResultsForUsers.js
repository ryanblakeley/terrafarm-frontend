import React from 'react';
import Relay from 'react-relay';
import IoArrowRightA from 'react-icons/lib/io/arrow-right-a';
import parseCoords from '../../shared/utils/parse-coords';
import Accordion from '../../shared/components/Accordion';
import RelationshipList from '../../shared/components/RelationshipList';
import ContentHeader from '../../shared/components/ContentHeader';
import BrowseContentWrapper from './BrowseContentWrapper';
import SearchBar from './SearchBar';
import SearchMap from './SearchMap';

class SearchResultsForUsers extends React.Component {
  static propTypes = {
    query: React.PropTypes.object,
    relay: React.PropTypes.object,
    initialBounds: React.PropTypes.string,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  static defaultProps = {
    initialBounds: '((42,-125),(49,-110))',
  };
  state = {
    search: '',
    bounds: '',
  };
  componentWillMount () {
    const {relay} = this.props;
    const {location} = this.context;
    const search = location.query.text || '';
    const bounds = location.query.bounds || '((-180,-180),(180,180))';

    if (search !== this.state.search
      || bounds !== this.state.bounds) {
      relay.setVariables({ search, bounds });
    }

    this.setState({ search, bounds });
  }
  componentWillReceiveProps (props, context) {
    const {relay} = props;
    const {location} = context;
    const search = location.query.text || '';
    const bounds = location.query.bounds || '((-180,-180),(180,180))';

    if (search !== this.state.search
      || bounds !== this.state.bounds) {
      relay.setVariables({ search, bounds });
    }
    this.setState({ search, bounds });
  }
  changeSearchText = value => {
    const {router, location} = this.context;

    router.replace({
      pathname: location.pathname,
      query: Object.assign(location.query, {
        text: value,
      }),
      state: {},
    });
  }
  render () {
    const {query} = this.props;

    return <div>
      <ContentHeader text={'Users'} />
      <BrowseContentWrapper
        searchBar={<SearchBar onChangeSearchText={this.changeSearchText} />}
        resultsPanel={
          <Accordion
            panels={[
              {
                header: {
                  icon: <IoArrowRightA />,
                  label: 'Results',
                },
                body: <RelationshipList
                  listItems={query.searchUsers.edges.map(edge => ({
                    name: edge.node.name,
                    itemId: edge.node.rowId,
                    itemUrl: 'user',
                  }))}
                />,
              },
            ]}
          />
        }
        map={<SearchMap
          places={query.searchUsers.edges.map(edge => ({
            name: edge.node.name,
            position: parseCoords(edge.node.placeByPlaceId.coords),
          }))}
        />}
      />
    </div>;
  }
}

export default Relay.createContainer(SearchResultsForUsers, {
  initialVariables: {
    count: 5,
    search: '',
    bounds: '((42,-125),(49,-110))',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        searchUsers(first:$count,search:$search,bounds:$bounds) {
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
