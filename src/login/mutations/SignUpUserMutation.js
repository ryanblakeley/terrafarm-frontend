import Relay from 'react-relay';

export default class SignUpUserMutation extends Relay.Mutation {
  getMutation () {
    return Relay.QL`mutation { registerUser }`;
  }
  getVariables () {
    return {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RegisterUserPayload {
        authenticateUserResult {
          jwtToken,
          userId,
        }
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on RegisterUserPayload {
              authenticateUserResult {
                jwtToken,
                userId,
              }
            }
          `,
        ],
      },
    ];
  }
}

