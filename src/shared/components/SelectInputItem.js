/*
 * When the raw MenuItem component is rendered in a select input, it works.
 * But returning it with this component breaks the select input.
 * Clicking on an item does not get a response
 */
import React from 'react';
import MenuItem from 'material-ui/MenuItem';

class SelectInputItem extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.object, React.PropTypes.string,
    ]),
    primaryText: React.PropTypes.string,
  };
  render () {
    return <MenuItem
      value={this.props.value}
      primaryText={this.props.primaryText}
    />;
  }
}

export default SelectInputItem;
