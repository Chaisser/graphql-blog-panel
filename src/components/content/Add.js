import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_CONTENT } from "./../../gql/content/mutation";

import { history } from "./../../routers/AppRouter";
import Form from "./Form";
import ErrorContainer from "../ui/ErrorContainer";

export default (props) => {
  const [createContent] = useMutation(CREATE_CONTENT);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      console.log(formData, "----FORM DATA");
      console.log(props.dataId, "POST");
      const result = await createContent({
        variables: { ...formData, postId: props.dataId },
      });
      if (result) {
        history.push(`/contents/${props.dataId}`);
      }
    } catch (err) {
      console.log(err);
      setSubmitError(err.message);
    }
  };

  return (
    <div>
      {submitError && <ErrorContainer title={submitError} />}
      <Form postId={props.dataId} handleSubmit={handleSubmit} title={"İçerik Ekle"} />
    </div>
  );
};
