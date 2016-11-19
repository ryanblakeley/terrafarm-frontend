import React from 'react';
import classNames from '../styles/BrowsePageHeadingStylesheet.css';

const BrowsePageHeading = _ => <div className={classNames.this}>
  <h2 className={classNames.title}>{location.pathname.split('/')[2]}</h2>
</div>;

BrowsePageHeading.contextTypes = {
  location: React.PropTypes.object,
};

export default BrowsePageHeading;
