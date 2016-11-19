import React from 'react';
import BrowseForm from './BrowseForm';
import BrowseList from './BrowseList';
import BrowseMap from './BrowseMap';

import classNames from '../styles/BrowseContentWrapperStylesheet.css';

class BrowseContentWrapper extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  static childContextTypes = {
    setSearchResults: React.PropTypes.func,
  };
  state = {
    search: '',
    bounds: '',
    count: 5,
    searchResults: [],
  };
  getChildContext () {
    return {
      setSearchResults: this.setSearchResults,
    };
  }
  setSearchResults = results => {
    this.setState({searchResults: results});
  }
  setSearchParams = (patch, statePatch) => {
    const {router, location} = this.context;

    router.replace({
      pathname: location.pathname,
      query: Object.assign(location.query, patch),
      state: location.state,
      // state: Object.assign(location.state, statePatch),
    });
  }
  render () {
    const {children} = this.props;
    const {searchResults} = this.state;

    return <div className={classNames.this}>
      <div className={classNames.flexWrapper}>
        <div className={classNames.left}>
          <BrowseForm setSearchParams={this.setSearchParams} />
          <BrowseList setSearchParams={this.setSearchParams} searchResults={searchResults} />
        </div>
        <div className={classNames.right}>
          <BrowseMap setSearchParams={this.setSearchParams} searchResults={searchResults} />
        </div>
      </div>
      {children}
    </div>;
  }
}

export default BrowseContentWrapper;
