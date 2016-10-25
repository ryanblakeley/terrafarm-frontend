import React from 'react';

import classNames from '../styles/TaglineStylesheet.css';

const Tagline = () => <div className={classNames.this}>
  <p className={classNames.text}>
    A web platform for<br />
    local food systems.
  </p>
  {/*
  <p className={classNames.text}>
    Allocate resources<br />
    and measure objectives<br />
    in local food systems.
  </p>
    */}
</div>;

export default Tagline;
