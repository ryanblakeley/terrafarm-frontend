import React from 'react';
import classNames from '../styles/RelationshipColorDashStylesheet.css';

const styles = {
  this: {},
};

const RelationshipColorDash = props => {
  styles.this.backgroundColor = props.color;

  return <div className={classNames.this} style={styles.this} />;
};

RelationshipColorDash.propTypes = {
  color: React.PropTypes.string.isRequired,
};

export default RelationshipColorDash;
