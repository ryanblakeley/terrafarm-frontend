import React from 'react';

import classNames from '../styles/RelationshipColorDotStylesheet.css';
const styles = {
  this: {},
};

export default class RelationshipColorDot extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
  };
  render () {
    const {color} = this.props;
    styles.this.backgroundColor = color;

    return <div className={classNames.this} style={styles.this} />;
  }
}
