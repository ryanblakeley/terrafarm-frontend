import { graphql } from 'react-relay';

const FoodDetailContainerQuery = graphql`
  query FoodDetailContainerQuery($foodId: Float!) {
    foodByRowId(rowId: $foodId) {
      ...FoodDetailContainer_foodByRowId,
    }
  }
`;

export default FoodDetailContainerQuery;
