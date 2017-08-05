import { graphql } from 'react-relay';

const FoodMatchesForSelectionContainerQuery = graphql`
  query FoodMatchesForSelectionContainerQuery(
    $foodSelectionId: Uuid!,
    $matchesCount: Int!,
  ) {
    foodMatchesForSelection(
      foodSelectionId: $foodSelectionId,
      first: $matchesCount,
    ) {
      ...FoodMatchesForSelectionContainer_foodMatchesForSelection
    }
  }
`;

export default FoodMatchesForSelectionContainerQuery;
