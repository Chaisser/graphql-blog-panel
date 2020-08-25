import React from "react";
import Loading from "./../ui/Loading";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST_WITH_CONTENTS } from "./../../gql/posts/query";
import { FcRefresh } from "react-icons/fc";
export default (props) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_POST_WITH_CONTENTS, {
    variables: {
      id: props.dataId,
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
      asdad
    </div>
  );
};
