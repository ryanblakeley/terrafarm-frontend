import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmers sell shares of future crops and crop rotations.',
      'A share comes with a set number of vouchers: which are later exchanged for product distributions.',
      'Shareholders can trade vouchers to get different products.',
      'Vouchers can be donated to charity and expire seasonally.',
    ]}
  />
</div>;

export default HowItWorks;

// <a href={'https://terra.farm/snippets/csa'} className={classNames.link}>CSA</a>s are like seasonal subscriptions to local farm products.
// 'Farmers sell product shares for crops and crop rotations before the growing season.',
// 'Shareholders receive product distributions during the harvest.',
