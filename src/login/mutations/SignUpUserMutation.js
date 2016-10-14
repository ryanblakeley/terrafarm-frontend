import Relay from 'react-relay';

export default class SignUpUserMutation extends Relay.Mutation {
  getMutation () {
    return Relay.QL`mutation { createUser }`;
  }
  getVariables () {
    return {
      userEmail: this.props.email,
      password: this.props.password,
      userName: this.props.name,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RegisterUserPayload {
        json,
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
              json,
            }
          `,
        ],
      },
    ];
  }
}

