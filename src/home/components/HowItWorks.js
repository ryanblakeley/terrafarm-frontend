import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmers sell product shares for crops and crop rotations before the growing season.',
      'Shareholders receive product distributions during the harvest.',
    ]}
  />
</div>;

export default HowItWorks;

// <a href={'https://terra.farm/snippets/csa'} className={classNames.link}>CSA</a>s are like seasonal subscriptions to local farm products.
