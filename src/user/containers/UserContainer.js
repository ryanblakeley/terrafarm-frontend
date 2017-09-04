import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import { PersonIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { P, Link } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  children: PropTypes.object,
};

const defaultProps = {
  children: null,
};

const UserContainer = props => {
  const userId = props.userByRowId.rowId;

  return <TransitionWrapper>
    <Layout page>
      <Menu
        baseUrl={`/user/${userId}/`}
        header={{ icon: <PersonIcon />, title: 'User' }}
        disabled
      />
      <P>
        <Link to={`/user/${userId}/journal`} underline >Journal</Link>
      </P>
      <P>
        <Link to={`/user/${userId}/presets`} underline >Presets</Link>
      </P>
      {props.children}
    </Layout>
  </TransitionWrapper>;
};

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
