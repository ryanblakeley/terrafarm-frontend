import PropTypes from 'prop-types';
import React from 'react';
import { H2 } from 'shared/components/Typography';
import { ArrowDownIcon } from 'shared/components/Icons';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/MenuHeaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

const propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleCloseImmediate: PropTypes.func,
};

const defaultProps = {
  open: false,
  disabled: true,
  handleOpen: () => {
    console.warn('handleOpen() not provided to MenuHeader.');
  },
  handleClose: () => {
    console.warn('handleClose() not provided to MenuHeader.');
  },
  handleCloseImmediate: () => {
    console.warn('handleCloseImmediate() not provided to MenuHeader.');
  },
};

class MenuHeader extends React.Component {
  toggleOpen = () => {
    const { open } = this.props;

    if (open) {
      this.handleTouchClose();
    } else {
      this.handleEnter();
    }
  }
  handleEnter = () => {
    this.props.handleOpen();
  }
  handleLeave = () => {
    this.props.handleClose();
  }
  handleTouchClose = () => {
    this.props.handleCloseImmediate();
  }
  render () {
    const { icon, title, disabled } = this.props;

    return <div className={classNames.this} >
      <div
        className={cx({ iconWrapper: true, disabled })}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onTouchTap={this.toggleOpen}
      >
        {React.cloneElement(icon, { className: cx({ iconSize: true }) })}
        {!disabled && <ArrowDownIcon width={24} height={24} />}
      </div>
      <div className={classNames.titleWrapper}>
        <H2 className={classNames.label}>
          {title}
        </H2>
      </div>
    </div>;
  }
}

MenuHeader.propTypes = propTypes;
MenuHeader.defaultProps = defaultProps;

export default MenuHeader;
