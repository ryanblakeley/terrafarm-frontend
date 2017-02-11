import Relay from 'react-relay';

export default class UpdateDistributionMutation extends Relay.Mutation {
  static fragments = {
    distribution: () => Relay.QL`
      fragment on Distribution {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateDistribution}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateDistributionPayload {
        distribution {
          description,
          status,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {distributionPatch} = this.props;

    return {
      distribution: {...distributionPatch},
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          distribution: this.props.distribution.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.distribution.id,
      distributionPatch: this.props.distributionPatch,
    };
  }
}
