import React from 'react';
import Relay from 'react-relay';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import JournalDateRootContainer from 'user/containers/JournalDateRootContainer';

// TODO:
// - layout components for JournalDate and JournalPanel

class JournalContainer extends React.Component {
  constructor (props) {
    super(props);

    const {user} = props;
    const latestFoodSelection = user && user.foodSelectionsByUserId.edges[0];
    const latestFoodSelectionDate = latestFoodSelection && latestFoodSelection.node.date;
    const daysAgo = 7;

    this.state = {
      latestDate: latestFoodSelectionDate,
      daysAgo,
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
  datesByDaysAgo (date, daysAgo) {
    const dates = [];
    for (let i = 0; i < daysAgo; i += 1) {
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
    const {latestDate, daysAgo} = this.state;
    const dates = this.datesByDaysAgo(latestDate, daysAgo);
    const journalDateContainers = dates.map(d => (
      <JournalDateRootContainer userId={user.rowId} date={d} key={d} />
    ));

    console.log('Latest journal date:', latestDate);
    console.log('Dates:', dates);

    return <TransitionWrapper>
      <Layout center>
        <Layout>{children}</Layout>
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

export default Relay.createContainer(JournalContainer, {
  initialVariables: {
    userId: null,
    orderBy: 'DATE_DESC',
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        rowId,
        foodSelectionsByUserId(orderBy: $orderBy, first: 1) {
          edges {
            node {
              date,
            },
          },
        }
      }
    `,
  },
});
