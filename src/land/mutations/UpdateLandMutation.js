import Relay from 'react-relay';

export default class UpdateLandMutation extends Relay.Mutation {
  static fragments = {
    land: () => Relay.QL`
      fragment on Land {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateLandPayload {
        land {
          name,
          location,
          description,
          size,
          image,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {attributes} = this.props;
    const {name, location, description, size, image} = attributes;

    return {
      land: {
        name,
        location,
        description,
        size,
        image,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          land: this.props.land.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.land.id,
      attributes: this.props.attributes,
    };
  }
}
