import React from 'react';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = props => <div className={classNames.this}>
  <h3 className={classNames.heading}>How It Works</h3>
  <ul className={classNames.listNumbered}>
    <li className={classNames.listItem}>
      Post resources: land, labor, equipment, and materials.
    </li>
    <li className={classNames.listItem}>
      Create tasks and organizations.
    </li>
    <li className={classNames.listItem}>
      Allocate resources to tasks and organizations.
    </li>
  </ul>
  <h3 className={classNames.heading}>Resource Allocation</h3>
  <ul className={classNames.listNumbered}>
    <li className={classNames.listItem}>
      Resource owners offer resources to tasks and organizations.
    </li>
    <li className={classNames.listItem}>
      Task authors and organization members request resources.
    </li>
    <li className={classNames.listItem}>
      Offers and requests include a "contact card" which is only shared with the
      person on the other end.
    </li>
    <li className={classNames.listItem}>
      Communication is established and the proposal is evaluated and decided on.
    </li>
  </ul>
</div>;

HowItWorks.propTypes = {};

export default HowItWorks;
