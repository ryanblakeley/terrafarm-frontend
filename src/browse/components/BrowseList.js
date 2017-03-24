import React from 'react';
import {ArrowRightThickIcon} from 'shared/components/Icons';
import Accordion from 'shared/components/Accordion';
import ResultsList from './ResultsList';

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
    activeResultItemId: React.PropTypes.string,
    setActiveResultItemId: React.PropTypes.func,
    setSearchParams: React.PropTypes.func,
  };
  handleResultItemClick = itemId => {
    const {setActiveResultItemId} = this.props;
    setActiveResultItemId(itemId);
  }
  render () {
    const {searchResults, activeResultItemId} = this.props;

    return <Accordion
      panels={[
        {
          header: {
            icon: <ArrowRightThickIcon />,
            label: 'Results',
          },
          body: (<ResultsList
            listItems={searchResults.map(result => ({
              name: result.name,
              itemId: result.rowId,
              itemUrl: result.url,
              active: activeResultItemId === result.rowId,
              setActive: this.handleResultItemClick,
            }))}
          />),
        },
      ]}
    />;
  }
}

export default BrowseList;
