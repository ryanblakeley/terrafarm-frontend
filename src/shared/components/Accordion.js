import React from 'react';
import AccordionPanel from './AccordionPanel';

import classNames from '../styles/AccordionStylesheet.css';

class Accordion extends React.Component {
  static propTypes = {
    panels: React.PropTypes.arrayOf(React.PropTypes.shape({
      header: React.PropTypes.shape({
        icon: React.PropTypes.element,
        label: React.PropTypes.string,
      }),
      body: React.PropTypes.element,
    })),
  };
  render () {
    const {panels} = this.props;

    return <div className={classNames.this}>
      {panels.map((panel, i) => <AccordionPanel {...panel} key={i} />)}
    </div>;
  }
}

export default Accordion;