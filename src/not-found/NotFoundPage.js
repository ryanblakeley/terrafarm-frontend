import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';

import classNames from './styles/NotFoundPageStylesheet.css';

/* eslint no-useless-escape: 0 */
const NotFoundPage = () => <TransitionWrapper>
  <div className={classNames.this}>
    <h2 className={classNames.pageHeading}>404</h2>
    <h3 className={classNames.contentHeading}>¯\_(ツ)_/¯</h3>
    <p className={classNames.bodyText}>Page not found.</p>
  </div>
</TransitionWrapper>;

export default NotFoundPage;
