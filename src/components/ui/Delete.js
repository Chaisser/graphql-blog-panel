import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";

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

export default ({ title, dataId, handleDelete }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [dataId]);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="bg-red-600 hover:bg-red-400 text-gray-100 py-1 text-xs px-2 rounded-r"
      >
        Sil
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete"
      >
        <h2 className="font-bold">{title} silinecektir. Onaylıyor musunuz?</h2>

        <div className="flex justify-center mt-6">
          <button
            className="bg-red-600 hover:bg-red-400 text-gray-100 py-1 text-xs px-2 rounded mr-4"
            onClick={() => handleDelete(dataId)}
          >
            Onaylıyorum
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-1 text-xs px-2 rounded mr-4"
            onClick={closeModal}
          >
            Vazgeç
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};
