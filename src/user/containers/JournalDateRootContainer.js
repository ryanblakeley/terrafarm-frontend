import React from 'react';
import {QueryRenderer, graphql} from 'react-relay/compat';
import {renderCallback} from 'routes';
import JournalDateContainer from 'user/containers/JournalDateContainer';

const JournalDateRootContainer = props => <QueryRenderer
  environment={props.environment}
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
    userId: props.userId,
    condition: {date: props.date},
    count: 30,
    orderBy: 'TIME_DESC',
  }}
  render={renderArgs => renderCallback(renderArgs, <JournalDateContainer />)}
/>;

JournalDateRootContainer.propTypes = {
  userId: React.PropTypes.string,
  date: React.PropTypes.string,
  environment: React.PropTypes.object,
};

export default JournalDateRootContainer;
