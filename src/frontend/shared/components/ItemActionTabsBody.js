import React from 'react';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/ItemActionTabsBodyStylesheet.css';
const cx = classnames.bind(classNamesContext);

// change show: true -> show
export default class ItemActionTabsBody extends React.Component {
  static propTypes = {
    currentContent: React.PropTypes.string,
    updateTitle: React.PropTypes.func,
    updateContent: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };
  cloneWithProps = (element) => React.cloneElement(element, {
    notifyClose: () => {
      this.props.updateTitle('');
      this.props.updateContent('');
    },
    show: !!this.props.currentContent && this.props.currentContent === element.props.value,
    value: element.props.value,
  });
  render () {
    const {currentContent, children} = this.props;

    return <div className={cx({this: true, show: !!currentContent})}>
      {React.Children.map(children, this.cloneWithProps)}
    </div>;
  }
}
