import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PhotoUpload from "./../common/PhotoUpload";

import ErrorContainer from "./../ui/ErrorContainer";
export default (props) => {
  const [error, setError] = useState("");

  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [description, setDescription] = useState(props.data ? props.data.description : "");
  const [photosArray, setPhotosArray] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title) {
      return setError(<ErrorContainer title="Başlık girilmesi gereklidir." />);
    }

    const sendData = {
      title,
      description,
      photo: photosArray.toString(),
      categoryType: "BLOG",
    };

    return props.handleSubmit(sendData);
  };

  return (
    <form onSubmit={onSubmit} className="w-full bg-white p-5">
      <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
      {error && error}

      <div className="block mb-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Görseller</label>
        <PhotoUpload
          isSingle={true}
          images={props.data && props.data.photo}
          imageArray={photosArray}
          setImageArray={setPhotosArray}
        />
      </div>

      <div className="flex flex-wrap  mb-3">
        <div className="w-full md:w-1/2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Başlık</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap  mb-3">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Açıklama</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
      </div>

      <div className="flex">
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};
