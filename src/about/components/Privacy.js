import React from 'react';
import classNames from '../styles/NoticeStylesheet.css';

const Privacy = _ => <div className={classNames.this}>
  <h3 className={classNames.heading}>
    Privacy
  </h3>
  <p className={classNames.text}>
    Your profile, resources, tasks, and organizations will not show up in the
    browse feature unless you edit them to have a location. A location can be a
    vague description, like a state, country, etc..
  </p>
</div>;

export default Privacy;
