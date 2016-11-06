import React from 'react';
import classNames from '../styles/ContentBodyTextStylesheet.css';

const ContentBodyText = props => <div className={classNames.this}>
  {/* <h6 className={classNames.label}>Description:</h6> */}
  <p className={classNames.text}>{props.text}</p>
</div>;

ContentBodyText.propTypes = {
  text: React.PropTypes.string,
};

export default ContentBodyText;
