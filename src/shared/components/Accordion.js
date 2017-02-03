import React from 'react';
import AccordionPanel from './AccordionPanel';

import classNames from '../styles/AccordionStylesheet.css';

const Accordion = props => <div className={classNames.this}>
  {props.panels.map((panel, i) => <AccordionPanel {...panel} key={i} />)}
</div>;

Accordion.propTypes = {
  panels: React.PropTypes.arrayOf(React.PropTypes.shape({
    header: React.PropTypes.shape({
      icon: React.PropTypes.element,
      label: React.PropTypes.string,
    }),
    body: React.PropTypes.element,
  })),
};

export default Accordion;
