import React from 'react';

import classNames from '../styles/ItemActionTabsLabelStylesheet.css';

export default class ItemActionTabsLabel extends React.Component {
  static propTypes = {
    currentTitle: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };
  cloneWithProps = (element, props) => React.cloneElement(element, {
    text: element.props.text,
    value: element.props.value,
    show: !!this.props.currentTitle && this.props.currentTitle === element.props.value,
  });
  render () {
    const {children} = this.props;

    return <div className={classNames.this} >
      {React.Children.map(children, this.cloneWithProps)}
    </div>;
  }
}
