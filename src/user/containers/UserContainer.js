import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import {PersonIcon} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';

const UserContainer = (props, context) => <TransitionWrapper>
  <Layout page>
    <Menu
      baseUrl={`/user/${props.user.rowId}`}
      header={{icon: <PersonIcon />, title: 'User'}}
      disabled
    />
    <Layout center children={props.children} />
  </Layout>
</TransitionWrapper>;

UserContainer.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.object,
};

UserContainer.contextTypes = {
  userId: React.PropTypes.string,
  router: React.PropTypes.object,
};

export default createFragmentContainer(UserContainer, {
  /* TODO manually deal with:
  initialVariables: {
    userId: null,
  }
  */
  user: graphql`
    fragment UserContainer_user on User {
      rowId,
    }
  `,
});
