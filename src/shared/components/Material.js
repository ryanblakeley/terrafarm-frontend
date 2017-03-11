import React from 'react';
import MaterialFlatButton from 'material-ui/FlatButton';
import MaterialRaisedButton from 'material-ui/RaisedButton';
import MaterialIconButton from 'material-ui/IconButton';
import MaterialMenuItem from 'material-ui/MenuItem';
import {Tabs as MaterialTabs, Tab as MaterialTab} from 'material-ui/Tabs';
import MaterialPopover from 'material-ui/Popover';

const FlatButton = props => <MaterialFlatButton {...props} />;
const RaisedButton = props => <MaterialRaisedButton {...props} />;
const IconButton = props => <MaterialIconButton {...props} />;
/* eslint-disable react/prefer-stateless-function */
// form component uses this element and uses refs so can't be a stateless function
class MenuItem extends React.Component {
  render () {
    return <MaterialMenuItem {...this.props} />;
  }
}
const Tabs = MaterialTabs;
const Tab = MaterialTab;
const Popover = props => <MaterialPopover {...props} />;

const defaultPropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

FlatButton.propTypes = Object.assign(defaultPropTypes, {});
RaisedButton.propTypes = Object.assign(defaultPropTypes, {});
IconButton.propTypes = defaultPropTypes;
MenuItem.propTypes = defaultPropTypes;
Tabs.propTypes = defaultPropTypes;
Tab.propTypes = defaultPropTypes;
Popover.propTypes = defaultPropTypes;

export {FlatButton, RaisedButton, IconButton, MenuItem, Tabs, Tab, Popover};
