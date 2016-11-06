import React from 'react';

import classNames from '../styles/TaglineStylesheet.css';

const Tagline = () => <div className={classNames.this}>
  <p className={classNames.text}>
    Crowdsource<span className={classNames.break} />
    food systems
  </p>
</div>;

export default Tagline;
