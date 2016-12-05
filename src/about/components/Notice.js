import React from 'react';
import classNames from '../styles/NoticeStylesheet.css';

const Notice = props => <div className={classNames.this}>
  <h3 className={classNames.heading}>
    Notice
  </h3>
  <p className={classNames.text}>
    This app is currently released as an alpha demo. While we try to make progress as quickly as possible, things may break. If you catch a bug or some undesireable behavior, please report it.
  </p>
</div>;

export default Notice;
