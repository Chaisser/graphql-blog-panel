import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_POST } from "./../../gql/posts/mutation";

import { history } from "./../../routers/AppRouter";
import Form from "./Form";
import ErrorContainer from "../ui/ErrorContainer";

export default (props) => {
  const [createCategory] = useMutation(CREATE_POST);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      const result = await createCategory({
        variables: { ...formData },
      });
      if (result) {
        history.push("/posts");
      }
    } catch (err) {
      console.log(err);
      setSubmitError(err.message);
    }
  };

  return (
    <div>
      {submitError && <ErrorContainer title={submitError} />}
      <Form handleSubmit={handleSubmit} title={"Yazı Ekle"} />
    </div>
  );
};
