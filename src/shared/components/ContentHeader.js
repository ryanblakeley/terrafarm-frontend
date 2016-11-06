import React from 'react';
import classNames from '../styles/ContentHeaderStylesheet.css';

const ContentHeader = props => <div className={classNames.this}>
  <h3 className={classNames.title}>{props.text}</h3>
</div>;

ContentHeader.propTypes = {
  text: React.PropTypes.string,
};

export default ContentHeader;
