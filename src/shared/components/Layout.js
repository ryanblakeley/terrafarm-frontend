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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
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
  onMouseEnter: null,
  onMouseLeave: null,
  children: null,
};

const Layout = props => {
  const { className, style, children, onMouseEnter, onMouseLeave, ...rest } = props;

  return <div
    className={`${cx({ ...rest })} ${className}`}
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>;
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
