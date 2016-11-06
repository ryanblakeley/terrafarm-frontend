import React from 'react';
import IoIosLocationOutline from 'react-icons/lib/io/ios-locatoutline';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ContentSubheaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

const ContentSubheader = props => <div className={classNames.this}>
  <IoIosLocationOutline className={classNames.icon} />
  <h4 className={cx({text: true, emptyWarning: !props.text})}>{props.text || '(Location not provided)'}</h4>
</div>;

ContentSubheader.propTypes = {
  text: React.PropTypes.string,
};

export default ContentSubheader;
