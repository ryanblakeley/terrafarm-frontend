import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';

import classNames from './styles/NotFoundPageStylesheet.css';

const NotFoundPage = () => <TransitionWrapper>
  <div className={classNames.this}>
    <h2 className={classNames.pageHeading}>Not Found</h2>
    <h3 className={classNames.contentHeading}>404</h3>
    <p className={classNames.bodyText}>Page not found.</p>
  </div>
</TransitionWrapper>;

export default NotFoundPage;
