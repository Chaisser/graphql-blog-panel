import gql from "graphql-tag";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $photo: String, $description: String, $publishedAt: String!, $category: ID!) {
    createPost(
      category: $category
      data: { title: $title, description: $description, photo: $photo, publishedAt: $publishedAt }
    ) {
      id
      title
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String
    $description: String
    $photo: String
    $publishedAt: String
    $category: ID
  ) {
    updatePost(
      id: $id
      category: $category
      data: { title: $title, description: $description, photo: $photo, publishedAt: $publishedAt }
    ) {
      id
      title
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

export { CREATE_POST, UPDATE_POST, DELETE_POST };
