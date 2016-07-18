import React from 'react';
import AppLogo from './AppLogo';
import AppHeaderNav from './AppHeaderNav';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/AppHeaderStylesheet.css';
const cx = classnames.bind(classNamesContext);

const AppHeader = (props) => <div className={cx({this: true, home: true})}>
  <AppLogo text={props.pageName} />
  <AppHeaderNav />
</div>;


AppHeader.propTypes = {
  pageName: React.PropTypes.string,
};

AppHeader.contextTypes = {
  router: React.PropTypes.object,
};

export default AppHeader;
