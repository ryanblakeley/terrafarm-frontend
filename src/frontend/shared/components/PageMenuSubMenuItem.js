import React from 'react';
import {Link} from 'react-router';

import classNames from '../styles/PageMenuSubMenuItemStylesheet.css';

const PageMenuSubMenuItem = (props) => <div className={classNames.this}>
  {props.disabled ? null : <Link to={props.path}>{props.text}</Link>}
</div>;

PageMenuSubMenuItem.propTypes = {
  text: React.PropTypes.string,
  path: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default PageMenuSubMenuItem;
