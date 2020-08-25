import gql from "graphql-tag";

const CREATE_CONTENT = gql`
  mutation CreateContent(
    $title: String
    $description: String
    $latitude: Float
    $longitude: Float
    $photos: [String!]!
    $embedCode: String
    $mediaType: MediaType
    $codeType: CodeType
    $contentType: ContentType!
    $soruce: String
    $postId: ID!
  ) {
    createContent(
      data: {
        title: $title
        description: $description
        photos: $photos
        latitude: $latitude
        longitude: $longitude
        embedCode: $embedCode
        mediaType: $mediaType
        codeType: $codeType
        contentType: $contentType
        soruce: $soruce
      }
      postId: $postId
    ) {
      id
      title
    }
  }
`;

const UPDATE_CONTENT = gql`
  mutation UpdateContent(
    $id: ID!
    $title: String
    $description: String
    $latitude: Float
    $longitude: Float
    $photos: [String!]!
    $embedCode: String
    $mediaType: MediaType
    $codeType: CodeType
    $contentType: ContentType
    $soruce: String
  ) {
    updateContent(
      id: $id
      data: {
        title: $title
        description: $description
        photos: $photos
        latitude: $latitude
        longitude: $longitude
        embedCode: $embedCode
        mediaType: $mediaType
        codeType: $codeType
        contentType: $contentType
        soruce: $soruce
      }
    ) {
      id
      title
    }
  }
`;

const DELETE_CONTENT = gql`
  mutation DeleteContent($id: ID!) {
    deleteContent(id: $id) {
      id
      title
    }
  }
`;

export { CREATE_CONTENT, UPDATE_CONTENT, DELETE_CONTENT };
