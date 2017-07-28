import React from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';
import ErrorComponent from 'core/components/ErrorComponent';
import Layout from 'shared/components/Layout';
import { P } from 'shared/components/Typography';
import UserJournalDateContainer from 'user/containers/UserJournalDateContainer';
import UserJournalDateRootContainerQuery
  from 'user/queries/UserJournalDateRootContainerQuery';

const propTypes = {
  userId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const UserJournalDateRootContainer = props => <QueryRenderer
  environment={props.relay.environment}
  query={UserJournalDateRootContainerQuery}
  variables={{
    userId: props.userId,
    condition: { date: props.date },
  }}
  render={({ error, props: fetchedProps }) => {
    if (error) {
      console.error(`Relay renderer ${error.message}`);
      return <ErrorComponent message={error.message} />;
    } else if (fetchedProps) {
      return <UserJournalDateContainer
        date={props.date}
        {...fetchedProps}
        router={props.router}
        match={props.match}
      />;
    }
    return <Layout center><P>Loading...</P></Layout>;
  }}
/>;

UserJournalDateRootContainer.propTypes = propTypes;

export default UserJournalDateRootContainer;