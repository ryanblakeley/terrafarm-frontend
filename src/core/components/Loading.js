import React from 'react';

import classNames from '../styles/LoadingStylesheet.css';

export default class Loading extends React.Component {
  render () {
    return <div className={classNames.this}>
      <div className={classNames.text}>Loading...</div>
    </div>;
  }
}
