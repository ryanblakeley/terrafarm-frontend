import React from 'react';
import classNames from '../styles/RelationshipColorDotStylesheet.css';

const styles = {
  this: {},
};

const RelationshipColorDot = props => {
  styles.this.backgroundColor = props.color;

  return <div className={classNames.this} style={styles.this} />;
};

RelationshipColorDot.propTypes = {
  color: React.PropTypes.string.isRequired,
};

export default RelationshipColorDot;
