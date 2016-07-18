import React from 'react';

import classNames from '../styles/ItemActionTabsMenuStylesheet.css';

export default class ItemActionTabsMenu extends React.Component {
  static propTypes = {
    onLeave: React.PropTypes.func,
    currentTitle: React.PropTypes.string,
    updateTitle: React.PropTypes.func,
    currentContent: React.PropTypes.string,
    updateContent: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };
  cloneWithProps = (element) => React.cloneElement(element, {
    icon: element.props.icon,
    large: element.props.large,
    value: element.props.value,
    disabled: element.props.disabled
      || (!!this.props.currentContent
        && this.props.currentContent !== element.props.value),
    onEnter: this.props.updateTitle,
    onClick: this.props.updateContent,
  });
  handleLeave = () => {
    const {currentContent, currentTitle, updateTitle} = this.props;
    if (!currentContent && currentTitle) updateTitle('');
  }
  render () {
    const {children} = this.props;

    return <div className={classNames.this} onMouseLeave={this.handleLeave}>
      {React.Children.map(children, this.cloneWithProps)}
    </div>;
  }
}
