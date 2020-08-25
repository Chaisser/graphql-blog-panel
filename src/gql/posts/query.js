import gql from "graphql-tag";

const GET_POSTS = gql`
  query Posts($language: String!, $categoryType: UsageType!) {
    posts(categoryType: $categoryType, language: $language) {
      id
      title
      photo
      viewCount
      shareCount
      publishedAt
      category {
        id
        title
      }
      user {
        id
        name
      }
      contents {
        id
      }
      comments {
        id
      }
    }
  }
`;

const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      description
      photo
      publishedAt
      category {
        id
      }
    }
  }
`;

const GET_POST_WITH_CONTENTS = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      description
      photo
      publishedAt
      viewCount
      shareCount
      category {
        id
        title
      }
      user {
        id
        name
      }
      comments {
        id
        text
        status
      }
      contents {
        title
        description
        latitude
        longitude
        photos
        video
        embedCode
        mediaType
        codeType
        contentType
        soruce
        order
      }
    }
  }
`;

export { GET_POSTS, GET_POST, GET_POST_WITH_CONTENTS };
