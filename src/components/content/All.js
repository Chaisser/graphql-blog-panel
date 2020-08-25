import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Loading from "./../ui/Loading";

import { GET_CONTENTS } from "./../../gql/content/query";
import { DELETE_CONTENT } from "./../../gql/content/mutation";
import Th from "./../ui/TableHead";
import Td from "./../ui/TableData";
import Delete from "./../ui/Delete";
import { FcRefresh, FcPlus, FcViewDetails } from "react-icons/fc";

export default (props) => {
  const [deleteContent] = useMutation(DELETE_CONTENT);

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_CONTENTS, {
    variables: {
      postId: props.dataId,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

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

  const handleDelete = async (id) => {
    try {
      const result = await deleteContent({
        variables: { id },
      });
      if (result) {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renderData = (data) => {
    if (data.length === 0) {
      return <div>Veri Yok</div>;
    }

    return data.contents.map((content, i) => {
      return (
        <tr key={content.id}>
          <Td custom="text-center w-1/12">{i + 1}</Td>
          <Td custom=" whitespace-no-wrap">{content.title}</Td>
          <Td custom="text-center w-2/12">{content.contentType}</Td>

          <Td custom="text-center w-2/12">
            <div className="inline-flex">
              <Link
                to={`/contents/edit/${content.id}/${props.dataId}`}
                className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2 rounded-l"
              >
                Düzenle
              </Link>
              <Delete handleDelete={handleDelete} dataId={content.id} title={content.title} />
            </div>
          </Td>
        </tr>
      );
    });
  };
  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => refetch()}
          className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-3"
        >
          <FcRefresh />
        </button>

        <Link
          to={`/posts/preview/${props.dataId}`}
          className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-3"
        >
          <FcViewDetails />
        </Link>

        <Link
          to={`/contents/add/${props.dataId}`}
          className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FcPlus />
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <Th>#</Th>
            <Th custom="text-left whitespace-no-wrap">Başlık</Th>
            <Th>İçerik Türü</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>{renderData(data)}</tbody>
      </table>
    </div>
  );
};
