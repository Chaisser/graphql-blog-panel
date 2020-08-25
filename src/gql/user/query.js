import gql from "graphql-tag";

const GET_USERS = gql`
  query User {
    users {
      id
      name
      email
      userType
      theme
    }
  }
`;

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      userType
      theme
      posts {
        id
        title
      }
    }
  }
`;

export { GET_USERS, GET_USER };
