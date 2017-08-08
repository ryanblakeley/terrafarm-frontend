import { graphql } from 'react-relay';

const SelectionPossibleFoodsQuery = graphql`
  query SelectionPossibleFoodsQuery(
    $foodSelectionId: Uuid!,
    $matchesCount: Int!,
  ) {
    foodMatchesForSelection(
      foodSelectionId: $foodSelectionId,
      first: $matchesCount,
    ) {
      ...SelectionPossibleFoods_foodMatchesForSelection
    }
  }
`;

export default SelectionPossibleFoodsQuery;
