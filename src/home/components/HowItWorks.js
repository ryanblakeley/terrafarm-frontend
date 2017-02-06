import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <p className={classNames.text}>
    <a href={'https://terra.farm/snippets/csa'} className={classNames.link}>CSA</a>s are like seasonal subscriptions to local farm products.
  </p>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmers sell product shares.',
      'Shareholders receive product distributions during the harvest.',
      'Shares expire seasonally.',
    ]}
  />
</div>;

export default HowItWorks;
