import React from 'react';
import {H6} from 'shared/components/Typography';
import classNames from '../styles/AccordionPanelStylesheet.css';

const AccordionPanel = props => <div>
  <div className={classNames.header}>
    <div className={classNames.iconWrapper}>
      {React.cloneElement(props.header.icon, {className: classNames.iconSize})}
    </div>
    <div className={classNames.labelWrapper}>
      <H6>{props.header.label}</H6>
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
