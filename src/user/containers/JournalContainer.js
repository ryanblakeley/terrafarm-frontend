import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import ActionPanel from 'shared/components/ActionPanel';
import JournalDateRootContainer from 'user/containers/JournalDateRootContainer';

class JournalContainer extends React.Component {
  constructor (props) {
    super(props);

    const {user} = props;
    const latestFoodSelection = user && user.foodSelectionsByUserId.edges[0];
    const latestFoodSelectionDate = latestFoodSelection && latestFoodSelection.node.date;
    const datesCount = 2;

    this.state = {
      latestDate: latestFoodSelectionDate,
      datesCount,
    };
  }
  componentWillReceiveProps (nextProps, nextState) {
    const {user} = nextProps;
    const latestFoodSelection = user && user.foodSelectionsByUserId.edges[0];
    const latestFoodSelectionDate = latestFoodSelection && latestFoodSelection.node.date;

    if (latestFoodSelectionDate !== this.state.latestDate) {
      this.setState({latestDate: latestFoodSelectionDate});
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
    const d = new Date(date.replace(/-/g, '/')); // fixes weird date string parsing behavior
    d.setDate(d.getDate() - daysAgo);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  render () {
    const {user, children} = this.props;
    const {router} = this.context;
    const {latestDate, datesCount} = this.state;
    const dates = this.getDates(latestDate, datesCount);
    const journalDateContainers = dates.map(d => (
      <JournalDateRootContainer userId={user.rowId} date={d} key={d} />
    ));

    // console.log('[CONTAINER]');
    // console.log('>', user.foodSelectionsByUserId.edges[0].node, latestDate);

    return <TransitionWrapper>
      <Layout center>
        <ActionPanel
          children={children}
          notifyClose={_ => router.replace(`/user/${user.rowId}/food-journal`)}
        />
        <Layout>{journalDateContainers}</Layout>
      </Layout>
    </TransitionWrapper>;
  }
}

JournalContainer.propTypes = {
  user: React.PropTypes.shape({
    rowId: React.PropTypes.string,
    foodSelectionsByUserId: React.PropTypes.object,
  }),
  children: React.PropTypes.object,
};

JournalContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default createFragmentContainer(JournalContainer, {
  /* TODO manually deal with:
  initialVariables: {
    userId: null,
    orderBy: 'DATE_DESC',
  }
  */
  user: graphql`
    fragment JournalContainer_user on User {
      rowId,
      foodSelectionsByUserId(orderBy: "DATE_DESC", first: 1) {
        edges {
          node {
            date,
          },
        },
      }
    }
  `,
});
