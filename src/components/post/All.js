import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Loading from "./../ui/Loading";
import moment from "moment";
import { GET_POSTS } from "./../../gql/posts/query";
import { DELETE_POST } from "./../../gql/posts/mutation";
import Th from "./../ui/TableHead";
import Td from "./../ui/TableData";
import Delete from "./../ui/Delete";
import { FcRefresh, FcPlus } from "react-icons/fc";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";

export default () => {
  const [deletePost] = useMutation(DELETE_POST);

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_POSTS, {
    variables: {
      language: localStorage.getItem("language"),
      categoryType: "BLOG",
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
      const result = await deletePost({
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

    return data.posts.map((post, i) => {
      return (
        <tr key={post.id}>
          <Td custom="text-center w-1/12">{i + 1}</Td>
          <Td custom="whitespace-no-wrap w-1/12">
            <img src={`http://localhost:4000/images/80/80/${post.photo}`} alt={post.title} />
          </Td>
          <Td custom="whitespace-no-wrap">{post.title}</Td>
          <Td custom="text-center whitespace-no-wrap">{post.category.title}</Td>
          <Td custom="text-center whitespace-no-wrap">{post.user.name}</Td>
          <Td custom="text-center whitespace-no-wrap">{post.viewCount}</Td>
          <Td custom="text-center whitespace-no-wrap">{post.shareCount}</Td>
          <Td custom="text-center whitespace-no-wrap">{post.comments.length}</Td>
          <Td custom="text-center whitespace-no-wrap">{moment(post.publishedAt).format("DD MM YYYY")}</Td>
          <Td custom="text-center whitespace-no-wrap">
            {post.contents.length === 0 ? (
              <AiFillCloseSquare className="text-red-500 text-xl mx-auto" />
            ) : (
              <AiFillCheckSquare className="text-green-500 text-xl mx-auto" />
            )}
          </Td>
          <Td custom="text-center w-2/12">
            <div className="inline-flex">
              <Link
                to={`/contents/${post.id}`}
                className="bg-purple-600 hover:bg-purple-400 text-gray-100 py-1 text-xs px-2 rounded-l"
              >
                İçerikler
              </Link>
              <Link
                to={`/posts/edit/${post.id}`}
                className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2"
              >
                Düzenle
              </Link>
              <Delete handleDelete={handleDelete} dataId={post.id} title={post.title} />
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
          to="/posts/add"
          className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FcPlus />
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <Th custom=" w-1/12">#</Th>
            <Th custom="text-left w-1/12">Görsel</Th>
            <Th custom="text-left whitespace-no-wrap">Başlık</Th>
            <Th custom="whitespace-no-wrap">Kategori</Th>
            <Th custom="whitespace-no-wrap">Yazar</Th>
            <Th custom="whitespace-no-wrap">Görüntülenme</Th>
            <Th custom="whitespace-no-wrap">Paylaşılma</Th>
            <Th custom="whitespace-no-wrap">Yorumlar</Th>
            <Th custom="whitespace-no-wrap">Tarih</Th>
            <Th custom="whitespace-no-wrap">İçerik</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>{renderData(data)}</tbody>
      </table>
    </div>
  );
};
