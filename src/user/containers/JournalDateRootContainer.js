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
      userRoute: new UserRoute({userId: props.userId}),
      journalDateContainer: Relay.createContainer(JournalDateContainer, {
        initialVariables: {
          condition: {date: props.date},
          count: 50,
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
                    foodId,
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
      }),
    };
  }
  render () {
    const {userRoute, journalDateContainer} = this.state;
    const {relayEnvironment} = this.context;

    return <Relay.Renderer
      Container={journalDateContainer}
      queryConfig={userRoute}
      environment={relayEnvironment}
    />;
  }
}

export default JournalDateRootContainer;
