import React from 'react';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/LayoutStylesheet.css';

const cx = classnames.bind(classNamesContext);

const Layout = props => <div
  className={cx({
    page: props.page,
    smallPage: props.smallPage,
    fullPage: props.fullPage,
    center: props.center,
    topSmall: props.topSmall,
    topMedium: props.topMedium,
  })}
>
  {props.children}
</div>;

Layout.propTypes = {
  page: React.PropTypes.bool,
  smallPage: React.PropTypes.bool,
  fullPage: React.PropTypes.bool,
  center: React.PropTypes.bool,
  topSmall: React.PropTypes.bool,
  topMedium: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

export default Layout;
/*
const Page = props => <div className={classNames.page}>{props.children}</div>;
const SmallPage = props => <div className={classNames.smallPage}>{props.children}</div>;
const FullPage = props => <div className={classNames.fullPage}>{props.children}</div>;
const Center = props => <div className={classNames.center}>{props.children}</div>;

const defaultPropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

Page.propTypes = defaultPropTypes;
SmallPage.propTypes = defaultPropTypes;
FullPage.propTypes = defaultPropTypes;
Center.propTypes = defaultPropTypes;

export {Page, SmallPage, FullPage, Center};
*/
