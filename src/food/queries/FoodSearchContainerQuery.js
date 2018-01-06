import { graphql } from 'react-relay';

const FoodSearchContainerQuery = graphql`
  query FoodSearchContainerQuery($foodId: BigFloat, $foodDescription: String) {
    searchFoods(foodId: $foodId, foodDescription: $foodDescription) {
      ...FoodSearchContainer_searchFoods,
    }
  }
`;

export default FoodSearchContainerQuery;

