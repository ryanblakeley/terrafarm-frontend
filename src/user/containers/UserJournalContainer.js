import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import ActionPanel from 'shared/components/ActionPanel';
// import UserJournalDateContainer from 'user/containers/UserJournalDateContainer';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  children: PropTypes.object,
  router: PropTypes.object.isRequired,
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
    const datesCount = 3;

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
    const { userByRowId: user, children, router } = this.props;
    const { latestDate, datesCount } = this.state;
    const dates = this.getDates(latestDate, datesCount);
    /*
    const journalDateContainers = dates.map(d => (
      <UserJournalDateContainer
        userId={user.rowId}
        date={d}
        key={d}
        environment={environment}
      />
    ));
    */

    return <TransitionWrapper>
      <Layout page>
        {children && <ActionPanel
          notifyClose={() => router.replace(`/user/${user.rowId}/food-journal`)}
        >
          {children}
        </ActionPanel>}
        <Layout>
          {/* journalDateContainers */}
          {dates}
        </Layout>
      </Layout>
    </TransitionWrapper>;
  }
}

UserJournalContainer.propTypes = propTypes;
UserJournalContainer.defaultProps = defaultProps;

// TODO ...UserJournalDateContainer_foodSelection,

export default createFragmentContainer(
  UserJournalContainer,
  graphql`
    fragment UserJournalContainer_userByRowId on User {
      rowId,
      foodSelectionsByUserId(first: $count, orderBy: $orderBy) {
        edges {
          node {
            date,
          },
        },
      },
    }
  `,
);
