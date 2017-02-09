import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmers sell product shares.',
      'Shareholders receive product distributions during the harvest.',
      'Shares have built-in expiration dates.',
    ]}
  />
</div>;

export default HowItWorks;

// <a href={'https://terra.farm/snippets/csa'} className={classNames.link}>CSA</a>s are like seasonal subscriptions to local farm products.
