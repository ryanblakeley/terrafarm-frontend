import React from 'react';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/ItemActionTabContentStylesheet.css';
const cx = classnames.bind(classNamesContext);

export default class ItemActionTabContent extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool,
    value: React.PropTypes.string,
    notifyClose: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };
  cloneWithProps = (element) => React.cloneElement(element, {
    notifyClose: this.props.notifyClose,
  });
  render () {
    const {show, children} = this.props;
    return <div className={cx({this: true, show})} >
      {React.Children.map(children, this.cloneWithProps)}
    </div>;
  }
}
