import React from 'react';
import wheatIcon from '../elements/wheat_icon.svg';
import classNames from '../styles/WheatIconStylesheet.css';

const WheatIcon = props => <div className={classNames.this}>
  <img src={wheatIcon} alt={'wheat_icon'} {...props} />
</div>;

WheatIcon.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};
WheatIcon.defaultProps = {
  className: '',
  style: {},
  width: 58,
  height: 40,
};

export default WheatIcon;
