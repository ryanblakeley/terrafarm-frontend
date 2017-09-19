import PropTypes from 'prop-types';
import React from 'react';
import classNamesContext from 'classnames/bind';
import MenuListItem from './MenuListItem';
import classNames from '../styles/MenuListStylesheet.css';

const cx = classNamesContext.bind(classNames);
// onTouchTap={() => props.handleCloseImmediate()}

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.element,
    title: PropTypes.string,
    url: PropTypes.string,
    disabled: PropTypes.bool,
  })).isRequired,
  // baseUrl: PropTypes.string,
  open: PropTypes.bool,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseImmediate: PropTypes.func,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  open: false,
  handleCloseImmediate: () => {
    console.warn('handleCloseImmediate() not provided to MenuList.');
  },
};

const MenuList = props => {
  const {
    list,
    open,
    handleOpen,
    handleClose,
    handleCloseImmediate,
    router,
    location,
  } = props;

  return <div
    className={cx({ this: true, open })}
    onMouseEnter={() => handleOpen()}
    onMouseLeave={() => handleClose()}
  >
    {list.map(item => !item.disabled && <MenuListItem
      {...item}
      key={item.title}
      closeImmediate={handleCloseImmediate}
      router={router}
      location={location}
    />)}
  </div>;
};

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
