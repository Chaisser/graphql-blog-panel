import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_CATEGORY } from "./../../gql/category/mutation";

import { history } from "./../../routers/AppRouter";
import Form from "./Form";
import ErrorContainer from "../ui/ErrorContainer";

export default (props) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      const result = await createCategory({
        variables: { ...formData, language: localStorage.getItem("language") },
      });
      if (result) {
        history.push("/news-categories");
      }
    } catch (err) {
      console.log(err);
      setSubmitError(err.message);
    }
  };

  return (
    <div>
      {submitError && <ErrorContainer title={submitError} />}
      <Form handleSubmit={handleSubmit} title={"Kategori Ekle"} />
    </div>
  );
};
