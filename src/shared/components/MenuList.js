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
};

const defaultProps = {
  open: false,
  handleCloseImmediate: () => {
    console.warn('handleCloseImmediate() not provided to MenuList.');
  },
};

const MenuList = props => <div
  className={cx({ this: true, open: props.open })}
  onMouseEnter={() => props.handleOpen()}
  onMouseLeave={() => props.handleClose()}
>
  {props.list.map(item => !item.disabled && <MenuListItem
    {...item}
    key={item.title}
    baseUrl={props.baseUrl}
    closeImmediate={props.handleCloseImmediate}
  />)}
</div>;

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
