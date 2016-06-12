import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/NotFoundPageStylesheet.css';

const NotFoundPage = () => <CSSTransitionGroup
  transitionName={transitionNames}
  transitionAppear
  transitionAppearTimeout={350}
  transitionEnterTimeout={350}
  transitionLeave={false}
>
  <div className={classNames.this}>
    <h2 className={classNames.pageHeading}>Not Found</h2>
    <h3 className={classNames.contentHeading}>404</h3>
    <p className={classNames.bodyText}>Page not found.</p>
  </div>
</CSSTransitionGroup>;

export default NotFoundPage;
