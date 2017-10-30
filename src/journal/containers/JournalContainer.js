import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { WarningMessage } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';
import { JournalIcon } from 'shared/components/Icons';

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  children: PropTypes.object,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

class JournalContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    const {
      currentPerson: user,
      children,
      router,
      location,
    } = this.props;
    const userId = user && user.rowId;

    if (!userId) return <NotFoundPage message={'User not found.'} />;

    const emptyJournalWarning = <WarningMessage>(Journal index?)</WarningMessage>;

    return <TransitionWrapper>
      <Layout page >
        <Menu
          baseUrl={'/journal'}
          header={{ icon: <JournalIcon />, title: 'Journal' }}
          disabled
          router={router}
          location={location}
        />
      </Layout>
      <Layout topSmall >
        {children || emptyJournalWarning}
      </Layout>
    </TransitionWrapper>;
  }
}

JournalContainer.propTypes = propTypes;
JournalContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  JournalContainer,
  graphql`
    fragment JournalContainer_currentPerson on User {
      id,
      rowId,
    }
  `,
);
