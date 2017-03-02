import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmer lists a scheduled product.',
      'Customer reserves a share of the product.',
      'Farmer accepts payment offline and activates the share or gives the customer an activation token.',
      'Vouchers are issued to the shareholder.',
      'Farmer validates a voucher token when product is distributed during the harvest.',
      'Vouchers can be traded and donated.',
    ]}
  />
</div>;

export default HowItWorks;
