import PropTypes from 'prop-types';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Spacing from 'material-ui/styles/spacing';
import MaterialDialog from 'material-ui/Dialog';
import MaterialFlatButton from 'material-ui/FlatButton';
import MaterialRaisedButton from 'material-ui/RaisedButton';
import MaterialIconButton from 'material-ui/IconButton';
import MaterialMenuItem from 'material-ui/MenuItem';
import { Tabs as MaterialTabs, Tab as MaterialTab } from 'material-ui/Tabs';
import MaterialPopover from 'material-ui/Popover';
import Layout from './Layout';
import classNames from '../styles/MaterialStylesheet.css';

const styles = {
  iconButton: {
    width: 52, height: 52, padding: 8,
  },
  iconButtonIcon: { fontSize: 36 },
};

const Dialog = props => <MaterialDialog {...props} />;
const FlatButton = props => {
  const { icon, ...rest } = props;
  return <MaterialFlatButton
    icon={icon && <Layout leftSmall inline >
      {React.cloneElement(icon, { className: classNames.buttonIcon })}
    </Layout>}
    {...rest}
  />;
};
const RaisedButton = props => <MaterialRaisedButton {...props} />;
const IconButton = props => {
  const { style, children, ...rest } = props;
  const iconButtonStyle = Object.assign({}, styles.iconButton, style);

  return <MaterialIconButton style={iconButtonStyle} {...rest} >
    {React.Children.map(children, child => (
      React.cloneElement(child, Object.assign({}, child.props, {
        style: Object.assign({}, styles.iconButtonIcon, child.props.style),
      }))
    ))}
  </MaterialIconButton>;
};

const MenuItem = MaterialMenuItem;
const Tabs = MaterialTabs;
const Tab = MaterialTab;
const Popover = props => <MaterialPopover {...props} />;

const defaultPropTypes = {
  children: PropTypes.node, // eslint-disable-line react/require-default-props
};

Dialog.propTypes = defaultPropTypes;
FlatButton.propTypes = Object.assign({}, defaultPropTypes, {
  icon: PropTypes.element,
});
RaisedButton.propTypes = defaultPropTypes;
IconButton.propTypes = Object.assign({}, defaultPropTypes, {
  style: PropTypes.object,
  iconStyle: PropTypes.object,
});
MenuItem.propTypes = defaultPropTypes;
Tabs.propTypes = defaultPropTypes;
Tab.propTypes = defaultPropTypes;
Popover.propTypes = defaultPropTypes;

export {
  MuiThemeProvider,
  getMuiTheme,
  Dialog,
  FlatButton,
  RaisedButton,
  IconButton,
  MenuItem,
  Popover,
  Spacing,
  Tabs,
  Tab,
};
