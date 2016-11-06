import React from 'react';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ActionPanelStylesheet.css';

const cx = classNamesContext.bind(classNames);

const ActionPanel = props => <div className={cx({this: true, empty: !props.children})}>
  {props.children
    && React.cloneElement(props.children, {
      notifyClose: props.notifyClose,
    })
  }
</div>;

ActionPanel.propTypes = {
  children: React.PropTypes.object,
  notifyClose: React.PropTypes.func,
};

export default ActionPanel;
