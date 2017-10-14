import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import { PersonIcon, JournalIcon, BookmarkIcon, FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { P } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  children: PropTypes.object,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

const ProfileContainer = props => {
  const { currentPerson: user, router, location, children } = props;
  const userId = user && user.rowId;
  const baseUrl = `/user/${userId}`;
  const journalUrl = 'journal';
  const presetsUrl = 'presets';
  const foodUrl = 'food';

  if (!userId) return <NotFoundPage message={'User not found.'} />;

  return <TransitionWrapper>
    <Layout page>
      <Menu
        baseUrl={baseUrl}
        header={{ icon: <PersonIcon />, title: 'User' }}
        disabled={false}
        router={router}
        location={location}
        list={[
          {
            icon: <FoodIcon />,
            title: 'Foods',
            baseUrl: '',
            url: foodUrl,
            disabled: false,
          },
          {
            icon: <JournalIcon />,
            title: 'Journal',
            baseUrl,
            url: journalUrl,
            disabled: false,
          },
          {
            icon: <BookmarkIcon />,
            title: 'Presets',
            baseUrl,
            url: presetsUrl,
            disabled: false,
          },
        ]}
      />
      <P style={{ marginBottom: 150 }} >
        User ID: <strong>{user.rowId}</strong>
      </P>
      {children}
    </Layout>
  </TransitionWrapper>;
};

ProfileContainer.propTypes = propTypes;
ProfileContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  ProfileContainer,
  graphql`
    fragment ProfileContainer_currentPerson on User {
      rowId,
    }
  `,
);
