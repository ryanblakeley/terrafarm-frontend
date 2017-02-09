import React from 'react';
import barnIcon from '../elements/barn_icon.svg';
import classNames from '../styles/BarnIconStylesheet.css';

const BarnIcon = props => <div className={classNames.this}>
  <img src={barnIcon} alt={'barn_icon'} {...props} />
</div>;

BarnIcon.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};
BarnIcon.defaultProps = {
  className: '',
  style: {},
  width: 58,
  height: 40,
};

export default BarnIcon;
