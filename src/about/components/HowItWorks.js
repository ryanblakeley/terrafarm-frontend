import React from 'react';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = props => <div className={classNames.this}>
  <h3 className={classNames.heading}>How It Works</h3>
  <ul className={classNames.listNumbered}>
    <li className={classNames.listItem}>
      Post resources: land, labor, equipment, and materials.
    </li>
    <li className={classNames.listItem}>
      Create tasks, projects, and organizations.
    </li>
    <li className={classNames.listItem}>
      Allocate resources to tasks, projects, and organizations.
    </li>
  </ul>
  <h3 className={classNames.heading}>Resource Allocation</h3>
  <ul className={classNames.listNumbered}>
    <li className={classNames.listItem}>
      Resource owners offer resources to tasks, projects, and organizations.
    </li>
    <li className={classNames.listItem}>
      Task authors, project authors, and organization members request resources.
    </li>
    <li className={classNames.listItem}>
      The corresponding party accepts or declines the offer or request.
    </li>
  </ul>
</div>;

HowItWorks.propTypes = {};

export default HowItWorks;
