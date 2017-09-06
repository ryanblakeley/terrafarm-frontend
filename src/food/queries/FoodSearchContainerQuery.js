import { graphql } from 'react-relay';

const FoodSearchContainerQuery = graphql`
  query FoodSearchContainerQuery($foodId: Float, $foodDescription: String) {
    searchFoods(foodId: $foodId, foodDescription: $foodDescription) {
      ...FoodSearchContainer_searchFoods,
    }
  }
`;

export default FoodSearchContainerQuery;

