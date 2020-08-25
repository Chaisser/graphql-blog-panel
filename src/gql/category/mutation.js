import gql from "graphql-tag";

const CREATE_CATEGORY = gql`
  mutation CreateCategory($title: String!, $photo: String, $description: String, $categoryType: UsageType) {
    createCategory(data: { title: $title, description: $description, photo: $photo, categoryType: $categoryType }) {
      id
      title
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $title: String, $description: String, $photo: String) {
    updateCategory(id: $id, data: { title: $title, description: $description, photo: $photo }) {
      id
      title
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      title
    }
  }
`;

const TOGGLE_CATEGORY_UPDATE = gql`
  mutation ToggleCategoryUpdate($id: ID!) {
    toggleCategoryUpdate(id: $id) {
      id
      title
    }
  }
`;

export { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, TOGGLE_CATEGORY_UPDATE };
