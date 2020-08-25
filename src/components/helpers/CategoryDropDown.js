import React from "react";
import { useQuery } from "@apollo/react-hooks";
import SelectSearch from "react-select-search";
import { GET_CATEGORIES } from "./../../gql/category/query";
import renderOption from "./../../utils/renderDropDown";

export default (props) => {
  const { loading, error, data, networkStatus } = useQuery(GET_CATEGORIES, {
    variables: {
      language: localStorage.getItem("language"),
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  if (loading || networkStatus === 4) {
    return <div className="text-sm">Yükleniyor</div>;
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
    <SelectSearch
      className="select-search"
      options={data.categories.map((item) => {
        return { name: item.title, value: item.id };
      })}
      defaultValue={props.category}
      value={props.category}
      search={true}
      onChange={(value) => props.setCategory(value)}
      renderOption={renderOption}
      name="category"
      placeholder="Kategori seçimi"
      autoComplete="on"
    />
  );
};
