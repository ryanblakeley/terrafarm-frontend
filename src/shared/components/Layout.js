import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/LayoutStylesheet.css';

const cx = classnames.bind(classNamesContext);

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  page: PropTypes.bool,
  smallPage: PropTypes.bool,
  smallPageFixed: PropTypes.bool,
  fullPage: PropTypes.bool,
  center: PropTypes.bool,
  left: PropTypes.bool,
  topSmall: PropTypes.bool,
  topMedium: PropTypes.bool,
  rightSmall: PropTypes.bool,
  bottomMedium: PropTypes.bool,
  leftSmall: PropTypes.bool,
  inline: PropTypes.bool,
  flexCenter: PropTypes.bool,
  style: PropTypes.object,
};

const defaultProps = {
  children: null,
  className: null,
  page: false,
  smallPage: false,
  smallPageFixed: false,
  fullPage: false,
  center: false,
  left: false,
  topSmall: false,
  topMedium: false,
  rightSmall: false,
  bottomMedium: false,
  leftSmall: false,
  inline: false,
  flexCenter: false,
  style: {},
};

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

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
