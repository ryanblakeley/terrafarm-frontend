import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmers sell shares for a planned product.',
      'Shareholders receive product distributions during the harvest.',
      'Shares expire seasonally.',
    ]}
  />
</div>;

export default HowItWorks;
