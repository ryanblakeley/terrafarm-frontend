import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay/compat';
import {renderCallback} from 'routes';
import JournalDateContainer from 'user/containers/JournalDateContainer';

class JournalDateRootContainer extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    date: React.PropTypes.string,
  };
  static contextTypes = {
    relayEnvironment: React.PropTypes.object,
  };
  componentWillMount () {
    console.log('Mount journal root.');
  }
  render () {
    const {userId, date} = this.props;
    const {relayEnvironment} = this.context;

    return <div>
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query JournalDateRootContainerQuery(
            $userId: Uuid!,
            $condition: FoodSelectionCondition,
            $count: Int,
            $orderBy: FoodSelectionsOrderBy
          ) {
            userByRowId(rowId: $userId) {
              rowId,
              foodSelectionsByUserId(condition: $condition, first: $count, orderBy: $orderBy) {
                totalCount,
                edges {
                  node {
                    rowId,
                    foodDescription,
                    foodId,
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
          }
        `}
        variables={{
          userId,
          condition: {date},
          count: 30,
          orderBy: 'TIME_DESC',
        }}
        render={renderArgs => renderCallback(renderArgs, <JournalDateContainer />)}
      />
    </div>;
  }
}

export default JournalDateRootContainer;
