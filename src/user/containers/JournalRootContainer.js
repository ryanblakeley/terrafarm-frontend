import React from 'react';
import {QueryRenderer, graphql} from 'react-relay/compat';
import {renderCallback} from 'routes';
import JournalContainer from 'user/containers/JournalContainer';

const JournalRootContainer = props => <QueryRenderer
  environment={props.environment}
  query={graphql`
    query JournalRootContainerQuery(
      $userId: Uuid!,
      $count: Int,
      $orderBy: FoodSelectionsOrderBy
    ) {
      userByRowId(rowId: $userId) {
        rowId,
        foodSelectionsByUserId(first: $count, orderBy: $orderBy) {
          edges {
            node {
              date,
            },
          },
        }
      }
    }
  `}
  variables={{
    userId: props.userId,
    count: 1,
    orderBy: 'DATE_DESC',
  }}
  render={renderArgs => renderCallback(renderArgs, (
    <JournalContainer environment={props.environment} />
  ))}
/>;

JournalRootContainer.propTypes = {
  userId: React.PropTypes.string,
  environment: React.PropTypes.object,
};

export default JournalRootContainer;
