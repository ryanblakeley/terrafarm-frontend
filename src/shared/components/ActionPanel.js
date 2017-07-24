import PropTypes from 'prop-types';
import React from 'react';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ActionPanelStylesheet.css';

const cx = classNamesContext.bind(classNames);

const propTypes = {
  children: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
};

const ActionPanel = props => (
  <div className={cx({ this: true, empty: !props.children })}>
    {props.children
      && React.cloneElement(props.children, {
        notifyClose: props.notifyClose,
      })
    }
  </div>
);

ActionPanel.propTypes = propTypes;

export default ActionPanel;
