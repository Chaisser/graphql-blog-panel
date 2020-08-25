import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_USER } from "./../../gql/user/mutation";

import { history } from "./../../routers/AppRouter";
import Form from "./Form";
import ErrorContainer from "../ui/ErrorContainer";

export default (props) => {
  const [createBrand] = useMutation(CREATE_USER);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (formData) => {
    console.log(formData);
    try {
      const result = await createBrand({
        variables: { ...formData },
      });
      if (result) {
        history.push("/users");
      }
    } catch (err) {
      console.log(err);
      setSubmitError(err.message);
    }
  };

  return (
    <div>
      {submitError && <ErrorContainer title={submitError} />}
      <Form handleSubmit={handleSubmit} title={"Kullanıcı Ekle"} />
    </div>
  );
};
