import React from 'react';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/PageMenuSubMenuStylesheet.css';
const cx = classnames.bind(classNamesContext);

const PageMenuSubMenu = (props) => <div className={cx({this: true, show: props.show})}>
  {props.children}
</div>;

PageMenuSubMenu.propTypes = {
  children: React.PropTypes.object,
  show: React.PropTypes.bool,
};

export default PageMenuSubMenu;
