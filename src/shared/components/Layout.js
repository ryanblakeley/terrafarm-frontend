import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/LayoutStylesheet.css';

const cx = classnames.bind(classNamesContext);

const propTypes = {
  page: PropTypes.bool,
  center: PropTypes.bool,
  left: PropTypes.bool,
  topSmall: PropTypes.bool,
  topMedium: PropTypes.bool,
  bottomSmall: PropTypes.bool,
  bottomMedium: PropTypes.bool,
  leftSmall: PropTypes.bool,
  inline: PropTypes.bool,
  flexCenter: PropTypes.bool,
  flexWrap: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

const defaultProps = {
  page: false,
  center: false,
  left: false,
  topSmall: false,
  topMedium: false,
  bottomSmall: false,
  bottomMedium: false,
  leftSmall: false,
  inline: false,
  flexCenter: false,
  flexWrap: false,
  className: '',
  style: {},
  children: null,
};

const Layout = props => {
  const { className, style, children, ...rest } = props;

  return <div
    className={`${cx({ ...rest })} ${className}`}
    style={style}
  >
    {children}
  </div>;
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
