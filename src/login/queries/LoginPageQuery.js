import { graphql } from 'react-relay';

const LoginPageQuery = graphql`
  query LoginPageQuery {
    query {
      ...LoginPage_query
    }
  }
`;

export default LoginPageQuery;
