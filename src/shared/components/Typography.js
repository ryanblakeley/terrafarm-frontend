import React from 'react';
import {Link as InternalLink} from 'react-router';
import classNames from '../styles/TypographyStylesheet.css';

const H1 = props => <h1
  className={`${props.className ? props.className : ''} ${classNames.h1}`}
  children={props.children}
/>;
const H2 = props => <h2
  className={`${props.className ? props.className : ''} ${classNames.h2}`}
  children={props.children}
/>;
const H3 = props => <h3
  className={`${props.className ? props.className : ''} ${classNames.h3}`}
  children={props.children}
/>;
const H4 = props => <h4
  className={`${props.className ? props.className : ''} ${classNames.h4}`}
  children={props.children}
/>;
const H5 = props => <h5
  className={`${props.className ? props.className : ''} ${classNames.h5}`}
  children={props.children}
/>;
const H6 = props => <h6
  className={`${props.className ? props.className : ''} ${classNames.h6}`}
  children={props.children}
/>;
const AppName = props => <h1
  className={`${props.className ? props.className : ''} ${classNames.appName}`}
  children={props.children}
/>;
const P = props => <p
  className={`${props.className ? props.className : ''} ${props.large ? classNames.paragraphLarge : classNames.paragraph}`}
  children={props.children}
/>;
const Span = props => <span
  className={`${props.className ? props.className : ''} ${classNames.span}`}
  children={props.children}
/>;
const A = props => <a
  href={props.href}
  className={`${props.className ? props.className : ''} ${classNames.externalLink}`}
  children={props.children}
/>;
const Link = props => <InternalLink
  to={props.to}
  className={`${props.className ? props.className : ''} ${classNames.internalLink} ${props.disabled ? classNames.disabledLink : ''}`}
  children={props.children}
  disabled={props.disabled}
/>;
const UL = props => <ul
  className={`${props.className ? props.className : ''} ${classNames.list} ${props.plumb ? classNames.plumb : ''}`}
  children={props.children}
/>;
const LI = props => <li
  className={`${props.className ? props.className : ''} ${classNames.listItem} ${props.noBullet ? classNames.noBullet : ''} ${props.truncate ? classNames.truncate : ''}`}
  children={props.children}
/>;
const Icon = props => React.cloneElement(props.icon, {
  className: `${props.className ? props.className : ''} ${classNames.icon}`,
});
const ErrorMessage = props => <p
  className={`${props.className ? props.className : ''} ${classNames.errorMessage}`}
  children={props.children}
/>;
const WarningMessage = props => <span
  className={`${props.className ? props.className : ''} ${classNames.warningMessage}`}
  children={props.children}
/>;

const defaultPropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  className: React.PropTypes.string,
};

H1.propTypes = defaultPropTypes;
H2.propTypes = defaultPropTypes;
H2.propTypes = defaultPropTypes;
H3.propTypes = defaultPropTypes;
H4.propTypes = defaultPropTypes;
H5.propTypes = defaultPropTypes;
H6.propTypes = defaultPropTypes;
AppName.propTypes = defaultPropTypes;
P.propTypes = Object.assign(defaultPropTypes, {
  large: React.PropTypes.bool,
});
Span.propTypes = defaultPropTypes;
A.propTypes = Object.assign(defaultPropTypes, {
  href: React.PropTypes.string,
});
Link.propTypes = Object.assign(defaultPropTypes, {
  to: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  disabled: React.PropTypes.bool,
});
UL.propTypes = Object.assign(defaultPropTypes, {
  plumb: React.PropTypes.bool,
});
LI.propTypes = Object.assign(defaultPropTypes, {
  noBullet: React.PropTypes.bool,
});
Icon.propTypes = Object.assign(defaultPropTypes, {
  icon: React.PropTypes.element,
});
ErrorMessage.propTypes = defaultPropTypes;
WarningMessage.propTypes = defaultPropTypes;

export {H1, H2, H3, H4, H5, H6, AppName, P, Span, A, Link, UL, LI, Icon, WarningMessage};
