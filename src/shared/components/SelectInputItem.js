/* eslint-disable react/prefer-stateless-function
 *
 * because menu item in material-ui and formsy uses `ref`
 * which is not available in stateless component
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
