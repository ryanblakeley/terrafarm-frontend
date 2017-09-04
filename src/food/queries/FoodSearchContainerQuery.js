import { graphql } from 'react-relay';

const FoodSearchContainerQuery = graphql`
  query FoodSearchContainerQuery($description: String!) {
    searchFoods(foodDescription: $description) {
      ...FoodSearchContainer_searchFoods,
    }
  }
`;

export default FoodSearchContainerQuery;

