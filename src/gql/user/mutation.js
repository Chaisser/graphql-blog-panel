import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $userType: UserType!) {
    createUser(data: { name: $name, email: $email, password: $password, userType: $userType }) {
      id
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $password: String, $userType: UserType) {
    updateUser(id: $id, data: { name: $name, email: $email, password: $password, userType: $userType }) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

export { DELETE_USER, UPDATE_USER, CREATE_USER };
