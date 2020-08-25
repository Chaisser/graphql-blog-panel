import gql from "graphql-tag";

const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $text: String, $status: CommentStatus) {
    updateComment(id: $id, text: $text, status: $status) {
      id
      text
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`;

export { UPDATE_COMMENT, DELETE_COMMENT };
