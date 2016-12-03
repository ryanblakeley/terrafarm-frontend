import React from 'react';
import classNamesContext from 'classnames/bind';
import MenuListItem from './MenuListItem';
import classNames from '../styles/MenuListStylesheet.css';

const cx = classNamesContext.bind(classNames);
// onTouchTap={_ => props.handleCloseImmediate()}

const MenuList = props => <div
  className={cx({this: true, open: props.open})}
  onMouseEnter={_ => props.handleOpen()}
  onMouseLeave={_ => props.handleClose()}
>
  {props.list.map(item => !item.disabled && <MenuListItem
    {...item}
    key={item.title}
    baseUrl={props.baseUrl}
    closeImmediate={props.handleCloseImmediate}
  />)}
</div>;

MenuList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    icon: React.PropTypes.element,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  })),
  baseUrl: React.PropTypes.string,
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
  handleCloseImmediate: React.PropTypes.func,
  handleOpen: React.PropTypes.func,
};

export default MenuList;
