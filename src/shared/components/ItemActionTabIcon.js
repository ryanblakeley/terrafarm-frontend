import React from 'react';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/ItemActionTabIconStylesheet.css';
const cx = classnames.bind(classNamesContext);

class ItemActionTabIcon extends React.Component {
  handleEnter = () => {
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  }
  handleLeave = () => {
    if (this.props.onLeave) {
      this.props.onLeave();
    }
  }
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  cloneWithProps (element, props) {
    return React.cloneElement(element, {
      className: cx({ icon: true, largeIcon: props.large }),
    });
  }
  render () {
    const {icon, large, disabled} = this.props;

    return <div
      className={cx({ this: true, large, disabled })}
      onMouseEnter={this.handleEnter}
      onMouseLeave={this.handleLeave}
      onClick={this.handleClick}
    >
      {this.cloneWithProps(icon, {large})}
    </div>;
  }
}

ItemActionTabIcon.propTypes = {
  icon: React.PropTypes.object,
  large: React.PropTypes.bool,
  onEnter: React.PropTypes.func,
  onLeave: React.PropTypes.func,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

ItemActionTabIcon.defaultProps = {
  icon: false,
  large: false,
};

export default ItemActionTabIcon;
