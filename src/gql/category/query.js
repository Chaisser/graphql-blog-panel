import gql from "graphql-tag";

const GET_CATEGORIES = gql`
  query Category($language: String!, $categoryType: UsageType) {
    categories(categoryType: $categoryType, language: $language) {
      id
      title
      photo
      posts {
        id
      }
    }
  }
`;

const GET_CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      title
      description
      photo
    }
  }
`;

export { GET_CATEGORIES, GET_CATEGORY };
