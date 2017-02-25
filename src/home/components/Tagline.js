import React from 'react';

import classNames from '../styles/TaglineStylesheet.css';

const Tagline = () => <div className={classNames.this}>
  <p className={classNames.text}>
    Pay in advance for<span className={classNames.break} />seasonal farm products.
  </p>
  {/*
  <p className={classNames.text2}>
    Pay-in-advance vouchers for seasonal farm products
  </p>
  */}
</div>;

export default Tagline;

// <span className={classNames.break} />
