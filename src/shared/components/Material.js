import React from 'react';
import MaterialFlatButton from 'material-ui/FlatButton';
import MaterialRaisedButton from 'material-ui/RaisedButton';
import MaterialIconButton from 'material-ui/IconButton';
import MaterialMenuItem from 'material-ui/MenuItem';
import {Tabs as MaterialTabs, Tab as MaterialTab} from 'material-ui/Tabs';
import MaterialPopover from 'material-ui/Popover';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/MaterialStylesheet.css';

const cx = classnames.bind(classNamesContext);

const FlatButton = props => {
  const {fullWidth, smallTop, ...rest} = props;
  return <MaterialFlatButton
    className={cx({fullWidth})}
    style={{marginTop: smallTop ? 15 : 0}}
    {...rest}
  />;
};
const RaisedButton = props => {
  const {smallRight, ...rest} = props;
  return <MaterialRaisedButton
    style={{marginRight: smallRight ? 15 : 0}}
    {...rest}
  />;
};
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

FlatButton.propTypes = Object.assign(defaultPropTypes, {
  fullWidth: React.PropTypes.bool,
  smallTop: React.PropTypes.bool,
});
RaisedButton.propTypes = Object.assign(defaultPropTypes, {
  smallRight: React.PropTypes.bool,
});
IconButton.propTypes = defaultPropTypes;
MenuItem.propTypes = defaultPropTypes;
Tabs.propTypes = defaultPropTypes;
Tab.propTypes = defaultPropTypes;
Popover.propTypes = defaultPropTypes;

export {FlatButton, RaisedButton, IconButton, MenuItem, Tabs, Tab, Popover};
