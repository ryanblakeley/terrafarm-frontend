import React from 'react';
import classNames from '../styles/NoticeStylesheet.css';

const Notice = _ => <div className={classNames.this}>
  <h3 className={classNames.heading}>
    Notice
  </h3>
  <p className={classNames.text}>
    This is an alpha product. Things may change or break at any time.
  </p>
</div>;

export default Notice;
