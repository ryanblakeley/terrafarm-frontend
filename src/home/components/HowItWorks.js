import React from 'react';
import NumberedList from 'shared/components/NumberedList';
import classNames from '../styles/HowItWorksStylesheet.css';

const HowItWorks = () => <div className={classNames.this}>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmer lists a product which is reserved by buyers as a “seasonal share”.  A share is a block of vouchers with a  schedule.',
      'The farmer accepts payment offline and activates the share or reveals a token to the shareholder which is used to activate the share.',
      'Vouchers can be traded, donated, and exchanged for product distributions during the harvest. The farmer validates a voucher with its unique token provided by the buyer.',
    ]}
  />
</div>;

export default HowItWorks;

