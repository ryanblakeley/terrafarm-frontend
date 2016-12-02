import React from 'react';
import classNames from '../styles/InfoWindowContentStylesheet.css';

const InfoWindowContent = props => <div className={classNames.this}>
  <p className={classNames.name}>{props.name}</p>
</div>;

InfoWindowContent.propTypes = {
  name: React.PropTypes.string,
};

export default InfoWindowContent;
