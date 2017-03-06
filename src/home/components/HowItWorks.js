import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmer A lists a scheduled product.',
      'Customer R reserves a product share.',
      'Farmer A approves shareholder R and vouchers are issued.',
      'When product is distributed, shareholder R trades in a voucher token which farmer A validates.',
    ]}
  />
</div>;

export default HowItWorks;
