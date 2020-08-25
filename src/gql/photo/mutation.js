import gql from "graphql-tag";

const UPLOAD_PHOTO = gql`
  mutation UploadPhoto($photo: Upload!) {
    uploadPhoto(photo: $photo) {
      photo
    }
  }
`;

export { UPLOAD_PHOTO };
