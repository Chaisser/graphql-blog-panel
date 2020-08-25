import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Loading from "./../ui/Loading";
import moment from "moment";
import { GET_COMMENTS } from "./../../gql/comment/query";
import { DELETE_COMMENT } from "./../../gql/comment/mutation";
import Th from "./../ui/TableHead";
import Td from "./../ui/TableData";
import Delete from "./../ui/Delete";
import CommentStatus from "./../ui/CommentStatus";
import { FcRefresh } from "react-icons/fc";

export default () => {
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_COMMENTS, {
    variables: {},
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
      const result = await deleteComment({
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

    return data.comments.map((comment, i) => {
      return (
        <tr key={comment.id}>
          <Td custom="text-center w-1/12">{i + 1}</Td>
          <Td custom=" whitespace-no-wrap">{moment(comment.createdAt).format("DD MM YYYY")}</Td>
          <Td custom=" whitespace-no-wrap">{comment.text}</Td>

          <Td custom="text-center w-2/12">{comment.post.title}</Td>
          <Td custom="text-center w-2/12">
            <CommentStatus refetch={refetch} id={comment.id} status={comment.status} />
          </Td>
          <Td custom="text-center w-2/12">
            <div className="inline-flex">
              <Link
                to={`/comments/edit/${comment.id}`}
                className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2 rounded-l"
              >
                Düzenle
              </Link>
              <Delete handleDelete={handleDelete} dataId={comment.id} title={comment.text} />
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
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <Th>#</Th>
            <Th custom="text-left whitespace-no-wrap">Tarih</Th>
            <Th custom="text-left whitespace-no-wrap">Yorum</Th>
            <Th>Yazı</Th>
            <Th>Durum</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>{renderData(data)}</tbody>
      </table>
    </div>
  );
};
