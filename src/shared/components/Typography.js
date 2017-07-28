import PropTypes from 'prop-types';
import React from 'react';
import { Link as InternalLink } from 'found';
import classNames from '../styles/TypographyStylesheet.css';

/* eslint-disable react/no-children-prop, max-len */
const H1 = props => <h1
  className={`${props.className ? props.className : ''} ${classNames.h1}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const H2 = props => <h2
  className={`${props.className ? props.className : ''} ${classNames.h2}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const H3 = props => <h3
  className={`${props.className ? props.className : ''} ${classNames.h3}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const H4 = props => <h4
  className={`${props.className ? props.className : ''} ${classNames.h4}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const H5 = props => <h5
  className={`${props.className ? props.className : ''} ${classNames.h5}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const H6 = props => <h6
  className={`${props.className ? props.className : ''} ${classNames.h6}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const AppName = props => <h1
  className={`${props.className ? props.className : ''} ${classNames.appName}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const P = props => <p
  className={`${props.className ? props.className : ''} ${props.large ? classNames.paragraphLarge : classNames.paragraph}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const Span = props => <span
  className={`${props.className ? props.className : ''} ${classNames.span}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const A = props => <a
  href={props.href}
  className={`${props.className ? props.className : ''} ${classNames.externalLink}`}
  children={props.children}
  style={props.style}
  target={'_blank'}
  title={props.title}
/>;
const Link = props => <InternalLink
  to={props.to}
  className={`${props.className ? props.className : ''} ${classNames.internalLink} ${props.disabled ? classNames.disabledLink : ''}`}
  children={props.children}
  disabled={props.disabled}
  style={props.style}
  activeClassName={props.activeClassName}
  exact={props.exact}
  title={props.title}
/>;
const UL = props => <ul
  className={`${props.className ? props.className : ''} ${classNames.list} ${props.plumb ? classNames.plumb : ''}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const LI = props => <li
  className={`${props.className ? props.className : ''} ${classNames.listItem} ${props.noBullet ? classNames.noBullet : ''} ${props.truncate ? classNames.truncate : ''}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const Icon = props => React.cloneElement(props.icon, {
  className: `${props.className ? props.className : ''} ${classNames.icon}`,
  style: props.style,
  color: props.color,
  title: props.title,
});
const ErrorMessage = props => <p
  className={`${props.className ? props.className : ''} ${classNames.errorMessage}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;
const WarningMessage = props => <span
  className={`${props.className ? props.className : ''} ${classNames.warningMessage}`}
  children={props.children}
  style={props.style}
  title={props.title}
/>;

const commonPropTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

const commonDefaultProps = {
  className: null,
  style: {},
  title: null,
};

H1.propTypes = commonPropTypes;
H1.defaultProps = commonDefaultProps;

H2.propTypes = commonPropTypes;
H2.defaultProps = commonDefaultProps;

H3.propTypes = commonPropTypes;
H3.defaultProps = commonDefaultProps;

H4.propTypes = commonPropTypes;
H4.defaultProps = commonDefaultProps;

H5.propTypes = commonPropTypes;
H5.defaultProps = commonDefaultProps;

H6.propTypes = commonPropTypes;
H6.defaultProps = commonDefaultProps;

AppName.propTypes = commonPropTypes;
AppName.defaultProps = commonDefaultProps;

P.propTypes = Object.assign({}, commonPropTypes, {
  large: PropTypes.bool,
});
P.defaultProps = Object.assign({}, commonDefaultProps, {
  large: false,
});

Span.propTypes = commonPropTypes;
Span.defaultProps = commonDefaultProps;

A.propTypes = Object.assign({}, commonPropTypes, {
  href: PropTypes.string.isRequired,
});
A.defaultProps = commonDefaultProps;

Link.propTypes = Object.assign({}, commonPropTypes, {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  disabled: PropTypes.bool,
  activeClassName: PropTypes.string,
  exact: PropTypes.bool,
});
Link.defaultProps = Object.assign({}, commonDefaultProps, {
  disabled: false,
});

UL.propTypes = Object.assign({}, commonPropTypes, {
  plumb: PropTypes.bool,
});
UL.defaultProps = Object.assign({}, commonDefaultProps, {
  plumb: false,
});

LI.propTypes = Object.assign({}, commonPropTypes, {
  noBullet: PropTypes.bool,
});
LI.defaultProps = Object.assign({}, commonDefaultProps, {
  noBullet: false,
});

Icon.propTypes = Object.assign({}, commonPropTypes, {
  icon: PropTypes.element.isRequired,
  children: PropTypes.node,
});
Icon.defaultProps = commonDefaultProps;

ErrorMessage.propTypes = commonPropTypes;
ErrorMessage.defaultProps = commonDefaultProps;

WarningMessage.propTypes = commonPropTypes;
WarningMessage.defaultProps = {
  children: '(not provided)',
};

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  AppName,
  P,
  Span,
  A,
  Link,
  UL,
  LI,
  Icon,
  WarningMessage,
  ErrorMessage,
};
