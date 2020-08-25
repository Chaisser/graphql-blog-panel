import gql from "graphql-tag";

const GET_CONTENTS = gql`
  query Content($postId: ID!) {
    contents(postId: $postId) {
      id
      title
      contentType
      order
    }
  }
`;

const GET_CONTENT = gql`
  query Content($id: ID!) {
    content(id: $id) {
      id
      title
      description
      photos
      latitude
      longitude
      video
      embedCode
      mediaType
      codeType
      contentType
      soruce
    }
  }
`;

export { GET_CONTENT, GET_CONTENTS };
