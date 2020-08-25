import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Loading from "./../ui/Loading";

import { GET_CATEGORIES } from "./../../gql/category/query";
import { DELETE_CATEGORY } from "./../../gql/category/mutation";
import Th from "./../ui/TableHead";
import Td from "./../ui/TableData";
import Delete from "./../ui/Delete";
import { FcRefresh, FcPlus } from "react-icons/fc";

export default () => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_CATEGORIES, {
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
      const result = await deleteCategory({
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

    return data.categories.map((category, i) => {
      return (
        <tr key={category.id}>
          <Td custom="text-center w-1/12">{i + 1}</Td>
          <Td custom="whitespace-no-wrap">
            <img src={`http://localhost:4000/images/80/80/${category.photo}`} alt={category.title} />
          </Td>
          <Td custom=" whitespace-no-wrap">{category.title}</Td>

          <Td custom="text-center w-2/12">{category.posts.length}</Td>

          <Td custom="text-center w-2/12">
            <div className="inline-flex">
              <Link
                to={`/news-categories/edit/${category.id}`}
                className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2 rounded-l"
              >
                Düzenle
              </Link>
              <Delete handleDelete={handleDelete} dataId={category.id} title={category.title} />
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
          to="/news-categories/add"
          className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FcPlus />
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <Th>#</Th>
            <Th custom="text-left w-1/12">Görsel</Th>
            <Th custom="text-left whitespace-no-wrap">Başlık</Th>
            <Th>Yazı Sayısı</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>{renderData(data)}</tbody>
      </table>
    </div>
  );
};
