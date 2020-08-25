import React, { useCallback, useState, useEffect } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_PHOTO } from "./../../gql/photo/mutation";

import { useDropzone } from "react-dropzone";

export default ({ images, setImageArray, isSingle, previewWidth = 100, previewHeight = 100 }) => {
  const [uploadPhoto] = useMutation(UPLOAD_PHOTO);
  let [addedPhotos, setAddedPhotos] = useState(images ? (isSingle ? [images] : images) : []);
  const [change, setChange] = useState(1);

  useEffect(() => {
    setImageArray(addedPhotos);
  }, [addedPhotos, setAddedPhotos, setImageArray]);

  const renderPhotos = (addedPhotos) => {
    if (addedPhotos.length === 0) {
      return <div></div>;
    }

    return addedPhotos.map((photo, i) => {
      return (
        <div key={i} className="m-2 p-2 inline-block border b-gray-300 relative">
          <div onClick={() => deletePhoto(photo)} className="absolute t-0 r-0 py-1 px-2 text-sm text-white bg-red-600">
            X
          </div>
          <img alt="Görsel" src={`http://localhost:4000/images/${previewWidth}/${previewHeight}/${photo}`} />
        </div>
      );
    });
  };

  const deletePhoto = (fileName) => {
    const photos = addedPhotos.filter((photo) => photo !== fileName);
    setAddedPhotos(photos);
  };
  const onDrop = useCallback(
    async (acceptedFiles) => {
      acceptedFiles.map(async (a) => {
        try {
          const result = await uploadPhoto({
            variables: {
              photo: a,
            },
          });

          addedPhotos.push(result.data.uploadPhoto.photo);
          setAddedPhotos(addedPhotos);
          setChange(change + Math.random());
        } catch (error) {
          console.log(error);
        }
      });
    },
    [addedPhotos, change, uploadPhoto]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      {renderPhotos(addedPhotos)}
      {isSingle && addedPhotos.length > 0 ? (
        ""
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps({ multiple: !isSingle })} />
          {isDragActive ? (
            <div>
              <div className="block bg-yellow-200 border b-green-200 text-center p-12 font-display">
                Fotoğrafı buraya bırakın
              </div>
            </div>
          ) : (
            <div>
              <div className="block bg-green-200 text-center p-12 border b-green-200  font-display">
                Fotoğrafı buraya bırakın veya bilgisayarınızdan bir dosya seçin
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
