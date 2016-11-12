import React from 'react';

import classNames from '../styles/TaglineStylesheet.css';

const Tagline = () => <div className={classNames.this}>
  <p className={classNames.text}>
    Resource-based<span className={classNames.break} />
    collaboration
  </p>
</div>;

export default Tagline;
