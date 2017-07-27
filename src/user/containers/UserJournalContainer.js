import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import ActionPanel from 'shared/components/ActionPanel';
import UserJournalDateRootContainer from 'user/containers/UserJournalDateRootContainer';
import classNames from '../styles/UserJournalContainerStylesheet.css';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  children: PropTypes.object,
  router: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

class UserJournalContainer extends React.Component {
  constructor (props) {
    super(props);

    const { userByRowId: user } = props;
    const latestFoodSelection = user && user.foodSelectionsByUserId.edges[0];
    const latestFoodSelectionDate = latestFoodSelection && latestFoodSelection.node.date;
    const datesCount = 7;

    this.state = {
      latestDate: latestFoodSelectionDate,
      datesCount,
    };
  }
  componentWillReceiveProps (nextProps) {
    const { userByRowId: user } = nextProps;
    const latestFoodSelection = user && user.foodSelectionsByUserId.edges[0];
    const latestFoodSelectionDate = latestFoodSelection && latestFoodSelection.node.date;

    if (latestFoodSelectionDate !== this.state.latestDate) {
      this.setState({ latestDate: latestFoodSelectionDate });
    }
  }
  getDates (date, datesCount) {
    const dates = [];
    for (let i = 0; i < datesCount; i += 1) {
      dates[i] = this.dateByDaysAgo(date, i);
    }

    return dates;
  }
  dateByDaysAgo = (date, daysAgo) => {
    const d = new Date(date.replace(/-/g, '/')); // fixes date string parsing
    d.setDate(d.getDate() - daysAgo);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  render () {
    const { userByRowId: user, children, router, match, relay } = this.props;
    const { latestDate, datesCount } = this.state;
    const dates = this.getDates(latestDate, datesCount);
    const journalDateRootContainers = dates.map(d => (
      <UserJournalDateRootContainer
        key={d}
        userId={user.rowId}
        date={d}
        router={router}
        match={match}
        relay={relay}
      />
    ));

    return <TransitionWrapper>
      <Layout page topSmall className={classNames.this}>
        <Layout className={classNames.journalDatesWrapper}>
          {journalDateRootContainers}
        </Layout>
        {children && <Layout className={classNames.editFoodSelectionPanelWrapper}>
          <ActionPanel
            notifyClose={() => router.replace(`/user/${user.rowId}/food-journal`)}
          >
            {children}
          </ActionPanel>
        </Layout>}
      </Layout>
    </TransitionWrapper>;
  }
}

UserJournalContainer.propTypes = propTypes;
UserJournalContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  UserJournalContainer,
  graphql`
    fragment UserJournalContainer_userByRowId on User {
      id,
      rowId,
      foodSelectionsByUserId(
        first: $count,
        orderBy: $orderBy
      ) @connection(key: "UserJournalContainer_foodSelectionsByUserId") {
        edges {
          node {
            id,
            date,
          },
        },
      },
    }
  `,
);
