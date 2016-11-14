import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';

import classNames from './styles/NotFoundPageStylesheet.css';

/* eslint no-useless-escape: 0 */
const NotFoundPage = props => <TransitionWrapper>
  <div className={classNames.this}>
    <h2 className={classNames.pageHeading}>404</h2>
    <h3 className={classNames.contentHeading}>¯\_(ツ)_/¯</h3>
    <p className={classNames.bodyText}>{props.message}</p>
  </div>
</TransitionWrapper>;

NotFoundPage.propTypes = {
  message: React.PropTypes.string,
};

NotFoundPage.defaultProps = {
  message: 'Page not found.',
};

export default NotFoundPage;
