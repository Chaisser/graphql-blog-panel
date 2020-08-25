import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_POST } from "./../../gql/posts/query";
import { UPDATE_POST } from "./../../gql/posts/mutation";
import Loading from "./../ui/Loading";
import { history } from "./../../routers/AppRouter";
import Form from "./Form";

export default (props) => {
  const { loading, error, data, networkStatus } = useQuery(GET_POST, {
    variables: {
      id: props.dataId,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const [updatePost] = useMutation(UPDATE_POST);

  if (loading || networkStatus === 4) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="bg-red-100 border border-red-600 text-center p-5">
        <p>Veri yüklenirken bir hata oluştu.</p>
        <p className="text-red-800">{error.message}</p>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    try {
      const result = await updatePost({
        variables: { id: props.dataId, ...formData },
      });
      if (result) {
        history.push("/posts");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form handleSubmit={handleSubmit} title={"Yazı Düzenle"} data={data.post} />
    </div>
  );
};
