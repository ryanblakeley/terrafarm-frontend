import React from 'react';
import IoIosLocationOutline from 'react-icons/lib/io/ios-locatoutline';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ContentSubheaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

const ContentSubheader = props => <div className={classNames.this}>
  {React.cloneElement(props.icon, {className: classNames.icon})}
  <h4 className={cx({text: true, light: props.light, emptyWarning: !props.text})}>{props.text || '(Location not provided)'}</h4>
</div>;

ContentSubheader.propTypes = {
  icon: React.PropTypes.element,
  text: React.PropTypes.string,
  light: React.PropTypes.bool,
};

ContentSubheader.defaultProps = {
  icon: <IoIosLocationOutline />,
};

export default ContentSubheader;
