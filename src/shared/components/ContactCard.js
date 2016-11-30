import React from 'react';
import classNames from '../styles/ContactCardStylesheet.css';

const ContactCard = props => <div className={classNames.this}>
  <h5 className={classNames.title}>
    Contact Info
  </h5>
  <p className={classNames.text}>
    {props.text}
  </p>
</div>;

ContactCard.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default ContactCard;
