import React from 'react';

import classNames from '../styles/TaglineStylesheet.css';

const Tagline = () => <div className={classNames.this}>
  <p className={classNames.text}>
    Community Shared Agriculture
  </p>
  <p className={classNames.text2}>
    Pay-in-advance for local farm products.
  </p>
</div>;

export default Tagline;

// <span className={classNames.break} />
