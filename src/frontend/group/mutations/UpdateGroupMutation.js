import Relay from 'react-relay';

export default class UpdateGroupMutation extends Relay.Mutation {
  static fragments = {
    group: () => Relay.QL`
      fragment on Group {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateGroupPayload {
        group {
          name,
          location,
          description,
          category,
          image,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {attributes} = this.props;
    const {name, location, description, category, image} = attributes;

    return {
      group: {
        name,
        location,
        description,
        category,
        image,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          group: this.props.group.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.group.id,
      attributes: this.props.attributes,
    };
  }
}


