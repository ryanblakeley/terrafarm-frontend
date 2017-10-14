import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation RegisterUserMutation(
    $input: RegisterUserInput!
  ) {
    registerUser(input: $input) {
      jwtToken
    }
  }
`;

function commit (environment, props, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { userPhone: props.userPhone, password: props.password },
    },
    onCompleted,
    onError,
  });
}

export default { commit };
