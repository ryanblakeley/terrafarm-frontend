import React from 'react';

import classNames from '../styles/AccordionPanelStylesheet.css';

const AccordionPanel = props => <div className={classNames.this}>
  <div className={classNames.header}>
    <div className={classNames.iconWrapper}>
      {React.cloneElement(props.header.icon, {
        className: classNames.icon,
      })}
    </div>
    <div className={classNames.labelWrapper}>
      <h5 className={classNames.label}>
        {props.header.label}
      </h5>
    </div>
  </div>
  <div className={classNames.body}>
    {props.body}
  </div>
</div>;

AccordionPanel.propTypes = {
  header: React.PropTypes.shape({
    icon: React.PropTypes.element,
    label: React.PropTypes.string,
  }),
  body: React.PropTypes.element,
};

export default AccordionPanel;
