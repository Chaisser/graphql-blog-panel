import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_COMMENT } from "./../../gql/comment/mutation";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { MdThumbsUpDown } from "react-icons/md";

import { BiEdit } from "react-icons/bi";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "400px",
    textAlign: "center",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default ({ status, id, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, [id]);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const [updateComment] = useMutation(UPDATE_COMMENT);

  const handleSubmit = async (status) => {
    setIsLoading(true);
    try {
      const result = await updateComment({
        variables: { id, status },
      });
      if (result) {
        setIsLoading(false);
        refetch();
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <Fragment>
      <button
        onClick={openModal}
        className={`flex items-center justify-center mx-auto ${status === "DECLINED" && "text-red-500"} ${
          status === "PENDING" && "text-yellow-500"
        } ${status === "PUBLISHED" && "text-green-500"} `}
      >
        {status} <BiEdit className={`text-xl inline-block ml-3 `} />
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="UpdateStatus"
      >
        {isLoading ? (
          <div>İşlem Yapılıyor</div>
        ) : (
          <div>
            <div className="flex justify-around">
              <button
                onClick={() => handleSubmit("DECLINED")}
                className={status === "DECLINED" ? "border border-gray-400 rounded" : "inherit"}
              >
                <IoMdThumbsDown className="text-red-500 text-4xl m-2" />
              </button>
              <button
                onClick={() => handleSubmit("PENDING")}
                className={status === "PENDING" ? "border border-gray-400 rounded" : "inherit"}
              >
                <MdThumbsUpDown className="text-yellow-600 text-4xl m-2" />
              </button>
              <button
                onClick={() => handleSubmit("PUBLISHED")}
                className={status === "PUBLISHED" ? "border border-gray-400 rounded" : "inherit"}
              >
                <IoMdThumbsUp className="text-green-500 text-4xl m-2" />
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2 rounded mr-4"
                onClick={closeModal}
              >
                Vazgeç
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};
