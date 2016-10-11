import React from 'react';

import classNames from '../styles/PageHeadingStylesheet.css';

const PageHeading = props => <div className={classNames.this}>
  <h1 className={classNames.pageHeading}>{props.text}</h1>
</div>;

PageHeading.propTypes = {
  text: React.PropTypes.string,
};

export default PageHeading;
