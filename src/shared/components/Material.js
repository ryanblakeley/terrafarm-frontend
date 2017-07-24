import PropTypes from 'prop-types';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Spacing from 'material-ui/styles/spacing';
import MaterialFlatButton from 'material-ui/FlatButton';
import MaterialRaisedButton from 'material-ui/RaisedButton';
import MaterialIconButton from 'material-ui/IconButton';
import MaterialMenuItem from 'material-ui/MenuItem';
import { Tabs as MaterialTabs, Tab as MaterialTab } from 'material-ui/Tabs';
import MaterialPopover from 'material-ui/Popover';
import Layout from './Layout';
import classNames from '../styles/MaterialStylesheet.css';

const FlatButton = props => {
  const { icon, ...rest } = props;
  return <MaterialFlatButton
    icon={icon && <Layout leftSmall inline>
      {React.cloneElement(icon, { className: classNames.buttonIcon })}
    </Layout>}
    {...rest}
  />;
};
const RaisedButton = props => <MaterialRaisedButton {...props} />;
const IconButton = props => <MaterialIconButton {...props} />;
const MenuItem = MaterialMenuItem;
const Tabs = MaterialTabs;
const Tab = MaterialTab;
const Popover = props => <MaterialPopover {...props} />;

const defaultPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object,
    PropTypes.array,
  ]),
};

FlatButton.propTypes = Object.assign({}, defaultPropTypes, {
  icon: PropTypes.element,
});
RaisedButton.propTypes = defaultPropTypes;
IconButton.propTypes = defaultPropTypes;
MenuItem.propTypes = defaultPropTypes;
Tabs.propTypes = defaultPropTypes;
Tab.propTypes = defaultPropTypes;
Popover.propTypes = defaultPropTypes;

export {
  MuiThemeProvider,
  getMuiTheme,
  FlatButton,
  RaisedButton,
  IconButton,
  MenuItem,
  Popover,
  Spacing,
  Tabs,
  Tab,
};
