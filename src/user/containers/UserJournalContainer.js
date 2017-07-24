import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  children: PropTypes.object,
};

const defaultProps = {
  children: null,
};

const UserJournalContainer = props => <TransitionWrapper>
  <Layout page>
    {JSON.stringify(props.userByRowId)}
    {props.children}
  </Layout>
</TransitionWrapper>;

UserJournalContainer.propTypes = propTypes;
UserJournalContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  UserJournalContainer,
  graphql`
    fragment UserJournalContainer_userByRowId on User {
      rowId,
    }
  `,
);
