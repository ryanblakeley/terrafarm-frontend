import React from 'react';

import classNames from '../styles/AccordionPanelStylesheet.css';

class AccordionPanel extends React.Component {
  static propTypes = {
    header: React.PropTypes.shape({
      icon: React.PropTypes.element,
      label: React.PropTypes.string,
    }),
    body: React.PropTypes.element,
  };
  render () {
    const {header, body} = this.props;

    return <div className={classNames.this}>
      <div className={classNames.header}>
        <div className={classNames.iconWrapper}>
          {React.cloneElement(header.icon, {
            className: classNames.icon,
          })}
        </div>
        <div className={classNames.labelWrapper}>
          <h5 className={classNames.label}>
            {header.label}
          </h5>
        </div>
      </div>
      <div className={classNames.body}>
        {body}
      </div>
    </div>;
  }
}

export default AccordionPanel;
