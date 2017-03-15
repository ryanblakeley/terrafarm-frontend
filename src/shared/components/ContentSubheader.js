import React from 'react';
import {H4, Link} from 'shared/components/Typography';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ContentSubheaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

const ContentSubheader = props => {
  const text = <H4 className={cx({text: true, light: props.light})}>
    {props.text}
  </H4>;
  return <div className={classNames.this}>
    <div className={classNames.iconWrapper}>
      {React.cloneElement(props.icon, {className: cx({iconSize: true})})}
    </div>
    {props.url ? <Link to={props.url}>{text}</Link> : text}
  </div>;
};

ContentSubheader.propTypes = {
  icon: React.PropTypes.element,
  text: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  light: React.PropTypes.bool,
  url: React.PropTypes.string,
};

export default ContentSubheader;
