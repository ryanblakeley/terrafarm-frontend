import React from 'react';
import classNames from '../styles/NotAuthorizedStylesheet.css';

const NotAuthorized = props => <div className={classNames.this}>
  <p className={classNames.text}>{props.text}</p>
</div>;

NotAuthorized.propTypes = {
  text: React.PropTypes.string,
};

NotAuthorized.defaultProps = {
  text: 'Not authorized.',
};

export default NotAuthorized;
