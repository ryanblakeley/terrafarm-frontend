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

const commonPropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  className: React.PropTypes.string,
};

H1.propTypes = commonPropTypes;
H2.propTypes = commonPropTypes;
H2.propTypes = commonPropTypes;
H3.propTypes = commonPropTypes;
H4.propTypes = commonPropTypes;
H5.propTypes = commonPropTypes;
H6.propTypes = commonPropTypes;
AppName.propTypes = commonPropTypes;
P.propTypes = Object.assign(commonPropTypes, {
  large: React.PropTypes.bool,
});
Span.propTypes = commonPropTypes;
A.propTypes = Object.assign(commonPropTypes, {
  href: React.PropTypes.string,
});
Link.propTypes = Object.assign(commonPropTypes, {
  to: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  disabled: React.PropTypes.bool,
});
UL.propTypes = Object.assign(commonPropTypes, {
  plumb: React.PropTypes.bool,
});
LI.propTypes = Object.assign(commonPropTypes, {
  noBullet: React.PropTypes.bool,
});
Icon.propTypes = Object.assign(commonPropTypes, {
  icon: React.PropTypes.element,
});
ErrorMessage.propTypes = commonPropTypes;
WarningMessage.propTypes = commonPropTypes;

WarningMessage.defaultProps = {
  children: '(not provided)',
};

export {H1, H2, H3, H4, H5, H6, AppName, P, Span, A, Link, UL, LI, Icon, WarningMessage};
