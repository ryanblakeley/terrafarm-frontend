import React from 'react';
import {Link} from 'react-router';
import IoArrowDownB from 'react-icons/lib/io/arrow-down-b';

import classNamesContext from 'classnames/bind';
import classNames from '../styles/MenuHeaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

class MenuHeader extends React.Component {
  static propTypes = {
    icon: React.PropTypes.element,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    open: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    handleOpen: React.PropTypes.func,
    handleClose: React.PropTypes.func,
    handleCloseImmediate: React.PropTypes.func,
  };
  toggleOpen = _ => {
    const {open} = this.props;

    if (open) {
      this.handleTouchClose();
    } else {
      this.handleEnter();
    }
  }
  handleEnter = _ => {
    const {handleOpen} = this.props;
    if (handleOpen) handleOpen();
  }
  handleLeave = _ => {
    const {handleClose} = this.props;
    if (handleClose) handleClose();
  }
  handleTouchClose = _ => {
    const {handleCloseImmediate} = this.props;
    if (handleCloseImmediate) handleCloseImmediate();
  }
  render () {
    const {icon, title, url, disabled} = this.props;

    return <div className={classNames.this} >
      <div
        className={cx({iconWrapper: true, disabled})}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onTouchTap={this.toggleOpen}
      >
        {React.cloneElement(icon, {
          className: cx({icon: true, largeIcon: true}),
        })}
        {!disabled && <div className={classNames.downArrow}>
          <IoArrowDownB className={classNames.icon} />
        </div>}
      </div>
      <div className={classNames.titleWrapper}>
        <h3 className={classNames.title}>
          <Link to={url} className={classNames.link}>{title}</Link>
        </h3>
      </div>
    </div>;
  }
}

export default MenuHeader;
