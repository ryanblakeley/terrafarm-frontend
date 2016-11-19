import React from 'react';
import IoArrowRightA from 'react-icons/lib/io/arrow-right-a';
import Accordion from '../../shared/components/Accordion';
import RelationshipList from '../../shared/components/RelationshipList';

class BrowseList extends React.Component {
  static propTypes = {
    searchResults: React.PropTypes.arrayOf(React.PropTypes.shape({
      rowId: React.PropTypes.string,
      url: React.PropTypes.string,
      name: React.PropTypes.string,
      coords: React.PropTypes.shape({
        lat: React.PropTypes.number,
        lng: React.PropTypes.number,
      }),
    })),
    setSearchParams: React.PropTypes.func,
  };
  changeMapCenter = coords => {
    const {setSearchParams} = this.props;

    setSearchParams({
      lat: coords.lat,
      lng: coords.lng,
    });
  }
  render () {
    const {searchResults} = this.props;

    return <Accordion
      panels={[
        {
          header: {
            icon: <IoArrowRightA />,
            label: 'Results',
          },
          body: <RelationshipList
            listItems={searchResults.map(result => ({
              name: result.name,
              itemId: result.rowId,
              itemUrl: result.url,
              onSetActive: _ => this.changeMapCenter(result.coords),
            }))}
          />,
        },
      ]}
    />;
  }
}

export default BrowseList;
