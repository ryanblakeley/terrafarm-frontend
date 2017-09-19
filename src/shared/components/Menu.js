import PropTypes from 'prop-types';
import React from 'react';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

import classNames from '../styles/MenuStylesheet.css';

const propTypes = {
  baseUrl: PropTypes.string,
  header: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.element,
    title: PropTypes.string,
    url: PropTypes.string,
    disabled: PropTypes.bool,
  })),
  // notifyReset: PropTypes.func,
  disabled: PropTypes.bool,
  timeoutDelay: PropTypes.number,
  router: PropTypes.object,
  location: PropTypes.object,
};

const defaultProps = {
  baseUrl: null,
  list: null,
  disabled: true,
  timeoutDelay: 310,
  router: {},
  location: {},
};

class Menu extends React.Component {
  state = {
    open: false,
    enabled: true,
    closeTimeoutId: null,
  };
  componentWillUnmount () {
    clearTimeout(this.state.closeTimeoutId);
    clearTimeout(this.state.openTimeoutId);
  }
  setOpen = () => {
    this.setState({
      openTimeoutId: setTimeout(() => {
        clearTimeout(this.state.closeTimeoutId);
        this.setState({
          open: true,
        });
      }, 1),
    });
  }
  setClose = () => {
    const { timeoutDelay } = this.props;

    this.setState({
      closeTimeoutId: setTimeout(() => {
        // clearTimeout(this.state.openTimeoutId);
        this.setState({
          open: false,
        });
      }, timeoutDelay),
    });
  }
  setCloseImmediate = () => {
    this.setState({ open: false });
  }
  render () {
    const { header, list, baseUrl, disabled, router, location } = this.props;
    const { open } = this.state;

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
        router={router}
        location={location}
      />}
    </div>;
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
