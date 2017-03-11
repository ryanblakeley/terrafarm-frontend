import React from 'react';
import {H4, Link} from 'shared/components/Typography';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ContentSubheaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

const ContentSubheader = props => {
  const text = <H4
    className={cx({text: true, light: props.light, emptyWarning: !props.text})}
    children={props.text}
  />;
  return <div className={classNames.this}>
    {props.icon}
    {props.url ? <Link to={props.url} children={text} /> : text}
  </div>;
};

ContentSubheader.propTypes = {
  icon: React.PropTypes.element,
  text: React.PropTypes.string,
  light: React.PropTypes.bool,
  url: React.PropTypes.string,
};

ContentSubheader.defaultProps = { text: '(Not provided)' };

export default ContentSubheader;
