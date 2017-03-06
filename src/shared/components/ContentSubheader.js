import React from 'react';
import {H4} from 'shared/components/Typography';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ContentSubheaderStylesheet.css';

const cx = classNamesContext.bind(classNames);

const ContentSubheader = props => <div className={classNames.this}>
  {props.icon}
  <H4 className={cx({text: true, light: props.light, emptyWarning: !props.text})}>{props.text}</H4>
</div>;

ContentSubheader.propTypes = {
  icon: React.PropTypes.element,
  text: React.PropTypes.string,
  light: React.PropTypes.bool,
};

ContentSubheader.defaultProps = { text: '(Not provided)' };

export default ContentSubheader;
