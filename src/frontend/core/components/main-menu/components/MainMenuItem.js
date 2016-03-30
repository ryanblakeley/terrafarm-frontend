import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import classNames from '../styles/MainMenuItemStylesheet.css';
const styles = {
  this: {
    color: Colors.blueGrey50,
  },
  label: {
    color: Colors.blueGrey50,
  },
};

export default class MainMenuItem extends React.Component {
  static propTypes = {
    icon: React.PropTypes.element,
    label: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
  };
  handleSelect = () => {
    const {onSelect} = this.props;

    onSelect();
  }
  render () {
    const {icon, label} = this.props;

    return <div
      className={classNames.this}
      style={styles.this}
      onClick={this.handleSelect}
      onTouchTap={this.handleSelect}
    >
      <div className={classNames.icon} >{icon}</div>
      <div className={classNames.label} style={styles.label} >{label}</div>
    </div>;
  }
}
