import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Loading from "./../ui/Loading";

import { GET_USERS } from "./../../gql/user/query";
import { DELETE_USER } from "./../../gql/user/mutation";
import Th from "./../ui/TableHead";
import Td from "./../ui/TableData";
import Delete from "./../ui/Delete";
import { FcRefresh, FcPlus } from "react-icons/fc";

export default () => {
  const [deleteUser] = useMutation(DELETE_USER);
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_USERS, {
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

  const handleDelete = async (userId) => {
    try {
      const result = await deleteUser({
        variables: { id: userId },
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

    return data.users.map((user, i) => {
      return (
        <tr key={user.id}>
          <Td custom="text-center w-1/12">{i + 1}</Td>
          <Td custom=" whitespace-no-wrap">{user.name}</Td>
          <Td>{user.email}</Td>
          <Td>{user.theme}</Td>
          <Td>{user.userType}</Td>
          <Td custom="text-center w-2/12">
            <div className="inline-flex">
              <Link
                to={`/users/edit/${user.id}`}
                className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2 rounded-l"
              >
                Düzenle
              </Link>
              <Delete handleDelete={handleDelete} dataId={user.id} title={user.name} />
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
          to="/users/add"
          className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FcPlus />
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <Th>#</Th>
            <Th custom="text-left whitespace-no-wrap">İsim Soyisim</Th>
            <Th custom=" whitespace-no-wrap text-left">E-Mail</Th>
            <Th custom=" whitespace-no-wrap text-left">Tema</Th>
            <Th custom=" whitespace-no-wrap text-left">Rol</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>{renderData(data)}</tbody>
      </table>
    </div>
  );
};
