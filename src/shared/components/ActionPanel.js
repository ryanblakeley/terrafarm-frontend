import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ActionPanelStylesheet.css';

const cx = classNamesContext.bind(classNames);

const propTypes = {
  children: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
};

const ActionPanel = props => (
  <Layout className={cx({ this: true, empty: !props.children })}>
    {props.children
      && React.cloneElement(props.children, {
        notifyClose: props.notifyClose,
      })
    }
  </Layout>
);

ActionPanel.propTypes = propTypes;

export default ActionPanel;
