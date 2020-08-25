import gql from "graphql-tag";

const LOGINUSER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export { LOGINUSER };
