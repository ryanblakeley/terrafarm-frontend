import React from 'react';

import classNames from '../styles/ItemActionTabsStylesheet.css';

export default class ItemActionTabs extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
  };
  static state = {
    currentTitle: '',
    currentContent: '',
  };
  cloneWithProps = (element) => React.cloneElement(element, {
    currentTitle: this.state ? this.state.currentTitle : '',
    currentContent: this.state ? this.state.currentContent : '',
    updateTitle: this.updateTitle,
    updateContent: this.updateContent,
    children: element.props.children,
  });
  updateTitle = (value) => {
    this.setState({
      currentTitle: value,
    });
  }
  updateContent = (value) => {
    this.setState({
      currentContent: value,
    });
  }
  render () {
    const {children} = this.props;

    return <div className={classNames.this}>
      {React.Children.map(children, this.cloneWithProps)}
    </div>;
  }
}
