import React from 'react';

import classNames from '../styles/BrowseContentWrapperStylesheet.css';

const BrowseContentWrapper = props => <div className={classNames.this}>
  <div className={classNames.flexWrapper}>
    <div className={classNames.left}>
      {props.searchBar}
      <div className={classNames.resultsPanel}>
        {props.resultsPanel}
      </div>
    </div>
    <div className={classNames.right}>
      {props.map}
    </div>
  </div>
</div>;

BrowseContentWrapper.propTypes = {
  searchBar: React.PropTypes.element,
  resultsPanel: React.PropTypes.element,
  map: React.PropTypes.element,
};

export default BrowseContentWrapper;
