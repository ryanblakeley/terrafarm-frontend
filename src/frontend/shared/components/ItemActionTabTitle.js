import React from 'react';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/ItemActionTabTitleStylesheet.css';
const cx = classnames.bind(classNamesContext);

const ItemActionTabTitle = (props) => <div className={cx({this: true, show: props.show})} >
  {props.text}
</div>;

ItemActionTabTitle.propTypes = {
  text: React.PropTypes.string,
  value: React.PropTypes.string,
  show: React.PropTypes.bool,
};

ItemActionTabTitle.defaultProps = {
  text: '',
  value: '',
  show: false,
};

export default ItemActionTabTitle;
