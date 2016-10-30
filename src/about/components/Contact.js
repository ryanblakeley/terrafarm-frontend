import React from 'react';
import classNames from '../styles/ContactStylesheet.css';

const Contact = props => {
  const emailLink = <a
    className={classNames.link}
    href={'mailto:ryan@terrafarm.io'}
  >
    email
  </a>;

  return <div className={classNames.this}>
    <h3 className={classNames.heading}>
      Contact
    </h3>
    <p className={classNames.text}>
      If you have any questions or feedback, please reach out via {emailLink}.
    </p>
  </div>;
};

export default Contact;
