import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { PersonIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  children: PropTypes.object,
};

const defaultProps = {
  children: null,
};

const UserContainer = props => <TransitionWrapper>
  <Layout page>
    <Menu
      baseUrl={`/user/${props.userByRowId.rowId}`}
      header={{ icon: <PersonIcon />, title: 'User' }}
      disabled
    />
    {props.children}
  </Layout>
</TransitionWrapper>;

UserContainer.propTypes = propTypes;
UserContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  UserContainer,
  graphql`
    fragment UserContainer_userByRowId on User {
      rowId,
    }
  `,
);
