import Relay from 'react-relay';

export default class UpdateProductShareMutation extends Relay.Mutation {
  static fragments = {
    share: () => Relay.QL`
      fragment on Share {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateShare}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateSharePayload {
        share {
          customerContact,
          customerNotes,
          status,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {sharePatch} = this.props;

    return {
      share: {...sharePatch},
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          share: this.props.share.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.share.id,
      sharePatch: this.props.sharePatch,
    };
  }
}
