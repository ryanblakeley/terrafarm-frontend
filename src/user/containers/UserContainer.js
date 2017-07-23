import PropTypes from 'prop-types';
import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay/compat';
import {PersonIcon} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
// import JournalRootContainer from 'user/containers/JournalRootContainer';
// <JournalRootContainer userId={props.user.rowId} environment={props.relay.environment} />

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  // children: PropTypes.object.isRequired,
  // relay: PropTypes.object,
};

const UserContainer = props => <TransitionWrapper>
  <Layout page>
    <Menu
      baseUrl={`/user/${props.userByRowId.rowId}`}
      header={{icon: <PersonIcon />, title: 'User'}}
      disabled
    />
  </Layout>
</TransitionWrapper>;

UserContainer.propTypes = propTypes;

export default createFragmentContainer(
  UserContainer,
  graphql`
    fragment UserContainer_userByRowId on User {
      rowId,
    }
  `,
);
