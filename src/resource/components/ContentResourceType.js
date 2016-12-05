import React from 'react';
import classNames from '../styles/ContentResourceTypeStylesheet.css';

const ContentResourceType = props => <div className={classNames.this}>
  <h5 className={classNames.text}>
    [{props.rawText.toLowerCase().replace('_', ' ')}]
  </h5>
</div>;

ContentResourceType.propTypes = {
  rawText: React.PropTypes.string,
};

export default ContentResourceType;
