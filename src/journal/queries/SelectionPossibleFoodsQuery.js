import { graphql } from 'react-relay';

const SelectionPossibleFoodsQuery = graphql`
  query SelectionPossibleFoodsQuery(
    $foodSelectionId: Uuid!,
    $possibleFoodsCount: Int!,
  ) {
    foodMatchesForSelection(
      foodSelectionId: $foodSelectionId,
      first: $possibleFoodsCount,
    ) {
      ...SelectionPossibleFoods_foodMatchesForSelection
    }
  }
`;

export default SelectionPossibleFoodsQuery;
