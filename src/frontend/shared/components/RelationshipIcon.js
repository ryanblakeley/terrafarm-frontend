import React from 'react';

import classNames from '../styles/RelationshipIconStylesheet.css';

export default class RelationshipIcon extends React.Component {
  static propTypes = {
    primary: React.PropTypes.element.isRequired,
    secondary: React.PropTypes.element,
  };
  render () {
    const {primary, secondary} = this.props;

    return <div className={classNames.this} >
      {secondary
        ? React.cloneElement(secondary, {className: classNames.secondary})
        : <div className={classNames.secondaryPlaceholder} />
      }
      {React.cloneElement(primary, {className: classNames.primary})}
    </div>;
  }
}
