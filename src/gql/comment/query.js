import gql from "graphql-tag";

const GET_COMMENTS = gql`
  query Comment($status: CommentStatus) {
    comments(status: $status) {
      id
      text
      status
      createdAt
      post {
        id
        title
      }
    }
  }
`;

const GET_COMMENT = gql`
  query Comment($id: ID!) {
    comment(id: $id) {
      id
      text
      status
    }
  }
`;

export { GET_COMMENT, GET_COMMENTS };
