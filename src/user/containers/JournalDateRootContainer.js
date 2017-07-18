import React from 'react';
import Relay from 'react-relay';
import {P} from 'shared/components/Typography';
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
  static childContextTypes = {
    setNutritionForDate: React.PropTypes.func,
  };
  constructor (props) {
    super(props);

    this.state = {
      userRoute: new UserRoute({userId: props.userId}),
      journalDateContainer: Relay.createContainer(JournalDateContainer, {
        initialVariables: {
          condition: {date: props.date},
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
      }),
    };
  }
  getChildContext () {
    return {
      setNutritionForDate: nutrition => this.setNutritionForDate(nutrition),
    };
  }
  setNutritionForDate (nutritionForDate) {
    this.setState({
      completeness: nutritionForDate.completeness,
      calories: nutritionForDate.calories,
      protein: nutritionForDate.protein,
      fat: nutritionForDate.fat,
      carbs: nutritionForDate.carbs,
    });
  }
  render () {
    const {date} = this.props;
    const {
      userRoute,
      journalDateContainer,
      completeness,
      calories,
      protein,
      fat,
      carbs,
    } = this.state;
    const {relayEnvironment} = this.context;

    return <div>
      <P>{date} | {calories} | {protein}g | {fat}g | {carbs}g | {completeness}%</P>
      <Relay.Renderer
        Container={journalDateContainer}
        queryConfig={userRoute}
        environment={relayEnvironment}
      />
    </div>;
  }
}

export default JournalDateRootContainer;
