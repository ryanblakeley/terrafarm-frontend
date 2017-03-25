import React from 'react';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/LayoutStylesheet.css';

const cx = classnames.bind(classNamesContext);

const Layout = props => <div
  className={`${cx({
    page: props.page,
    smallPage: props.smallPage,
    smallPageFixed: props.smallPageFixed,
    fullPage: props.fullPage,
    center: props.center,
    left: props.left,
    topSmall: props.topSmall,
    topMedium: props.topMedium,
    rightSmall: props.rightSmall,
    bottomMedium: props.bottomMedium,
    leftSmall: props.leftSmall,
    inline: props.inline,
    flexCenter: props.flexCenter,
  })} ${props.className ? props.className : ''}`}
  style={props.style}
>
  {props.children}
</div>;

Layout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  className: React.PropTypes.string,
  page: React.PropTypes.bool,
  smallPage: React.PropTypes.bool,
  smallPageFixed: React.PropTypes.bool,
  fullPage: React.PropTypes.bool,
  center: React.PropTypes.bool,
  left: React.PropTypes.bool,
  topSmall: React.PropTypes.bool,
  topMedium: React.PropTypes.bool,
  rightSmall: React.PropTypes.bool,
  bottomMedium: React.PropTypes.bool,
  leftSmall: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  flexCenter: React.PropTypes.bool,
  style: React.PropTypes.object,
};

export default Layout;
