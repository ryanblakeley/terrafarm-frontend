import React from 'react';
import classNamesContext from 'classnames/bind';
import MenuListItem from './MenuListItem';
import classNames from '../styles/MenuListStylesheet.css';

const cx = classNamesContext.bind(classNames);

const MenuList = props => <div
  className={cx({this: true, open: props.open})}
  onMouseEnter={_ => props.handleOpen()}
  onMouseLeave={_ => props.handleClose()}
  onTouchTap={_ => props.handleCloseImmediate()}
>
  {props.list.map(item => <MenuListItem
    {...item}
    key={item.title}
    baseUrl={props.baseUrl}
  />)}
</div>;

MenuList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    icon: React.PropTypes.element,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
  })),
  baseUrl: React.PropTypes.string,
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
  handleCloseImmediate: React.PropTypes.func,
  handleOpen: React.PropTypes.func,
};

export default MenuList;
