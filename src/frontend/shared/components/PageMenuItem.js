import React from 'react';
import PageMenuItemIcon from './PageMenuItemIcon';
import PageMenuSubMenu from './PageMenuSubMenu';

import classNames from '../styles/PageMenuItemStylesheet.css';

class PageMenuItem extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  render () {
    const {large, icon, children, disabled} = this.props;
    const {open} = this.state;

    if (disabled) return null;

    return <div
      className={classNames.this}
      onMouseEnter={this.handleOpen}
      onMouseLeave={this.handleClose}
      onTouchTap={this.handleOpen}
    >
      <PageMenuItemIcon
        large={large}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        {icon}
      </PageMenuItemIcon>
      <PageMenuSubMenu show={open}>{children}</PageMenuSubMenu>
    </div>;
  }
}

PageMenuItem.propTypes = {
  icon: React.PropTypes.element,
  large: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.object,
};

export default PageMenuItem;
