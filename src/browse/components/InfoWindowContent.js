import React from 'react';
import classNames from '../styles/InfoWindowContentStylesheet.css';

const InfoWindowContent = props => <div className={classNames.this}>
  <p className={classNames.name}>
    {props.resultItem.name}
  </p>
</div>;

InfoWindowContent.propTypes = {
  resultItem: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    rowId: React.PropTypes.string,
  }),
};

export default InfoWindowContent;
