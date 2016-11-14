import React from 'react';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

import classNames from '../styles/MenuStylesheet.css';

class Menu extends React.Component {
  static propTypes = {
    baseUrl: React.PropTypes.string,
    header: React.PropTypes.shape({
      icon: React.PropTypes.element,
      title: React.PropTypes.string,
    }),
    list: React.PropTypes.arrayOf(React.PropTypes.shape({
      icon: React.PropTypes.element,
      title: React.PropTypes.string,
      url: React.PropTypes.string,
    })),
    notifyReset: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  state = {
    open: false,
    enabled: true,
    closeTimeoutId: null,
  };
  componentWillUnmount () {
    clearTimeout(this.state.closeTimeoutId);
    clearTimeout(this.state.openTimeoutId);
  }
  setOpen = _ => {
    this.setState({
      openTimeoutId: setTimeout(() => {
        clearTimeout(this.state.closeTimeoutId);
        this.setState({
          open: true,
        });
      }, 1),
    });
  }
  setClose = _ => {
    this.setState({
      closeTimeoutId: setTimeout(() => {
        // clearTimeout(this.state.openTimeoutId);
        this.setState({
          open: false,
        });
      }, 650),
    });
  }
  setCloseImmediate = _ => {
    this.setState({open: false});
  }
  render () {
    const {header, list, baseUrl, disabled} = this.props;
    const {open} = this.state;

    return <div className={classNames.this} >
      <MenuHeader
        {...header}
        open={open}
        disabled={disabled}
        handleOpen={this.setOpen}
        handleClose={this.setClose}
        handleCloseImmediate={this.setCloseImmediate}
      />
      {!disabled && <MenuList
        list={list}
        baseUrl={baseUrl}
        open={open}
        disabled={disabled}
        handleOpen={this.setOpen}
        handleClose={this.setClose}
        handleCloseImmediate={this.setCloseImmediate}
      />}
    </div>;
  }
}

export default Menu;
