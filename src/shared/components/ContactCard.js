import React from 'react';
import Layout from './Layout';
import {H5, P} from './Typography';
import classNames from '../styles/ContactCardStylesheet.css';

const ContactCard = props => <Layout center className={classNames.this}>
  <H5>Contact Info</H5>
  <P>{props.text}</P>
</Layout>;

ContactCard.propTypes = {
  text: React.PropTypes.string.isRequired,
};

ContactCard.defaultProps = {
  text: '(none)',
};

export default ContactCard;
