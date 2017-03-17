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
    setSearchParams: React.PropTypes.func,
    setSearchResults: React.PropTypes.func,
  };
  state = {
    searchResults: [],
    activeResultItemId: null,
  };
  getChildContext () {
    return {
      setSearchParams: this.setSearchParams,
      setSearchResults: this.setSearchResults,
    };
  }
  setSearchResults = results => {
    this.setState({searchResults: results});
  }
  setActiveResultItemId = id => {
    this.setState({activeResultItemId: id});
  }
  setSearchParams = (nextQuery, nextState) => {
    const {router, location} = this.context;
    const currentQuery = location.query || {};
    const currentState = location.state || {};

    router.replace({
      pathname: location.pathname,
      query: Object.assign(currentQuery, nextQuery),
      state: Object.assign(currentState, nextState),
    });
  }
  render () {
    const {children} = this.props;
    const {searchResults, activeResultItemId} = this.state;

    return <div className={classNames.this}>
      <div className={classNames.flexWrapper}>
        <div className={classNames.left}>
          <BrowseForm setSearchParams={this.setSearchParams} />
          <BrowseList
            setSearchParams={this.setSearchParams}
            searchResults={searchResults}
            setActiveResultItemId={this.setActiveResultItemId}
            activeResultItemId={activeResultItemId}
          />
        </div>
        <div className={classNames.right}>
          <BrowseMap
            setSearchParams={this.setSearchParams}
            searchResults={searchResults}
            setActiveResultItemId={this.setActiveResultItemId}
            activeResultItemId={activeResultItemId}
          />
        </div>
      </div>
      {children}
    </div>;
  }
}

export default BrowseContentWrapper;
