import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/ItemActionTabButtonStylesheet.css';
const cx = classnames.bind(classNamesContext);
const styles = {
  hero: {
    width: 64,
    height: 64,
    padding: 0,
  },
};

export default class ItemActionTabButton extends React.Component {
  static propTypes = {
    icon: React.PropTypes.element,
    hero: React.PropTypes.bool,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onEnter: React.PropTypes.func,
    onClick: React.PropTypes.func,
  };
  static defaultProps = {
    hero: false,
    value: '',
    disabled: false,
  };
  handleEnter = () => {
    const {value, disabled, onEnter} = this.props;

    if (onEnter && !disabled) onEnter(value);
  }
  handleClick = () => {
    const {value, disabled, onClick} = this.props;

    if (onClick && !disabled) onClick(value);
  }
  cloneWithProps = (element) => React.cloneElement(element, {
    className: cx({
      icon: true,
      heroIcon: this.props.hero,
    }),
  });
  render () {
    const {icon, hero, disabled} = this.props;
    const iconElement = icon && this.cloneWithProps(icon);

    return <div className={cx({this: true, hero})}>
      <IconButton
        className={cx({ button: true, disabled })}
        style={hero ? styles.hero : {}}
        onMouseEnter={this.handleEnter}
        onClick={this.handleClick}
      >
        {iconElement}
      </IconButton>
    </div>;
  }
}
