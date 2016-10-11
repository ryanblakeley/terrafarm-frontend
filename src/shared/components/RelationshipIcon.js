import React from 'react';

import classNames from '../styles/RelationshipIconStylesheet.css';

const RelationshipIcon = props => <div className={classNames.this} >
  {props.secondary
    ? React.cloneElement(props.secondary, {className: classNames.secondary})
    : <div className={classNames.secondaryPlaceholder} />
  }
  {React.cloneElement(props.primary, {className: classNames.primary})}
</div>;

RelationshipIcon.propTypes = {
  primary: React.PropTypes.element.isRequired,
  secondary: React.PropTypes.element,
};

export default RelationshipIcon;
