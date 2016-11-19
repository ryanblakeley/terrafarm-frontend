import Relay from 'react-relay';

export default class CreatePlaceMutation extends Relay.Mutation {
  static fragments = {
  };
  getMutation () {
    return Relay.QL`mutation{createPlace}`;
  }
  getVariables () {
    return {
      place: this.props.placeData,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreatePlacePayload {
        placeEdge,
        place,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreatePlacePayload {
              place {
                rowId,
              }
            }
          `,
        ],
      },
    ];
  }
}
