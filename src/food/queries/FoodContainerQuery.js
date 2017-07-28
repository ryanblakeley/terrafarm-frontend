import { graphql } from 'react-relay';

const FoodContainerQuery = graphql`
  query FoodContainerQuery($foodId: Float!) {
    foodByRowId(rowId: $foodId) {
      ...FoodContainer_foodByRowId,
    }
  }
`;

export default FoodContainerQuery;
