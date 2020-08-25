import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CONTENT } from "./../../gql/content/query";
import { UPDATE_CONTENT } from "./../../gql/content/mutation";
import Loading from "./../ui/Loading";
import { history } from "./../../routers/AppRouter";
import Form from "./Form";

export default (props) => {
  const { loading, error, data, networkStatus } = useQuery(GET_CONTENT, {
    variables: {
      id: props.dataId,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const [updateCategory] = useMutation(UPDATE_CONTENT);

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
      const result = await updateCategory({
        variables: { id: props.dataId, ...formData },
      });
      if (result) {
        history.push(`/contents/${props.postId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form postId={props.postId} handleSubmit={handleSubmit} title={"İçerik Düzenle"} data={data.content} />
    </div>
  );
};
