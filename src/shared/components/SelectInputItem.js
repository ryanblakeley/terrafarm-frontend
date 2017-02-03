import React from 'react';
import MenuItem from 'material-ui/MenuItem';

const SelectInputItem = _ => <MenuItem
  value={this.props.value}
  primaryText={this.props.primaryText}
/>;

SelectInputItem.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.object, React.PropTypes.string,
  ]),
  primaryText: React.PropTypes.string,
};

export default SelectInputItem;
