import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import ActionPanel from 'shared/components/ActionPanel';
import JournalDateRootContainer from 'journal/containers/JournalDateRootContainer';
import classNames from '../styles/JournalContainerStylesheet.css';

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

class JournalContainer extends React.Component {
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
      <JournalDateRootContainer
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
        {children && <Layout className={classNames.actionPanelWrapper}>
          <ActionPanel
            notifyClose={() => router.replace(`/journal/${user.rowId}`)}
          >
            {children}
          </ActionPanel>
        </Layout>}
      </Layout>
    </TransitionWrapper>;
  }
}

JournalContainer.propTypes = propTypes;
JournalContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  JournalContainer,
  graphql`
    fragment JournalContainer_userByRowId on User {
      id,
      rowId,
      foodSelectionsByUserId(
        first: $count,
        orderBy: $orderBy
      ) @connection(key: "JournalContainer_foodSelectionsByUserId") {
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