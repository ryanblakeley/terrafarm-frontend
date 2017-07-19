import React from 'react';
import Relay from 'react-relay';
import UserQueries from 'user/queries/UserQueries';
import JournalDateContainer from 'user/containers/JournalDateContainer';

// TODO:
// - componentWillReceiveProps if userId or date changes
// - after implement root container for each food selection, move fragment params

class UserRoute extends Relay.Route {
  static queries = UserQueries;
  static paramDefinitions = {
    userId: {required: true},
  };
  static routeName = 'UserRoute';
}

class JournalDateRootContainer extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    date: React.PropTypes.string,
  };
  static contextTypes = {
    relayEnvironment: React.PropTypes.object,
  };
  constructor (props) {
    super(props);

    this.state = {
      Container: this.getJournalDateContainer(props.date),
      route: this.getUserRoute(props.userId),
    };
  }
  componentWillReceiveProps (nextProps) {
    const {userId, date} = this.props;
    const {userId: nextUserId, date: nextDate} = nextProps;

    if (date !== nextDate) {
      this.setState({
        Container: this.getJournalDateContainer(date),
      });
    }
    if (userId !== nextUserId) {
      this.setState({
        route: this.getUserRoute(nextUserId),
      });
    }
  }
  getUserRoute = userId => new UserRoute({userId})
  getJournalDateContainer = date => (
    Relay.createContainer(JournalDateContainer, {
      initialVariables: {
        condition: {date},
        count: 30,
        orderBy: 'CREATED_AT_DESC',
      },
      fragments: {
        user: () => Relay.QL`
          fragment on User {
            rowId,
            foodSelectionsByUserId(condition: $condition, first: $count, orderBy: $orderBy) {
              totalCount,
              edges {
                node {
                  rowId,
                  foodDescription,
                  foodByFoodId {
                    rowId,
                    calories,
                    protein,
                    fat,
                    carbs,
                  },
                  foodIdSource,
                  mass,
                  massSource,
                  unitQuantity,
                  unitOfMeasureByUnitOfMeasureId {
                    fullName,
                  },
                  date,
                }
              }
            }
          }
        `,
      },
    })
  )
  render () {
    const {Container, route} = this.state;
    const {relayEnvironment} = this.context;

    return <div>
      <Relay.Renderer
        Container={Container}
        queryConfig={route}
        environment={relayEnvironment}
      />
    </div>;
  }
}

export default JournalDateRootContainer;
