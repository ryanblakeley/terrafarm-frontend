import React from 'react';

import classNames from '../styles/TaglineStylesheet.css';

const Tagline = () => <div className={classNames.this}>
  <p className={classNames.text}>
    Pay&mdash;in&mdash;advance for seasonal<span className={classNames.break} />farm products
  </p>
  {/*
  <p className={classNames.text2}>
    Pay-in-advance vouchers for seasonal farm products
  </p>
  */}
</div>;

export default Tagline;

// <span className={classNames.break} />
