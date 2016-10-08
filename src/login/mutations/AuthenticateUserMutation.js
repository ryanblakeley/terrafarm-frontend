import Relay from 'react-relay';

export default class AuthenticateUserMutation extends Relay.Mutation {
  getMutation () {
    return Relay.QL`mutation { authenticateUser }`;
  }
  getVariables () {
    return {
      userEmail: this.props.email,
      password: this.props.password,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AuthenticateUserPayload {
        output
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on AuthenticateUserPayload {
              output
            }
          `,
        ],
      },
    ];
  }
}

