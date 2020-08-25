import React, { useState } from "react";
import ErrorContainer from "./../ui/ErrorContainer";
export default (props) => {
  const [error, setError] = useState("");

  const [text, setText] = useState(props.data ? props.data.text : "");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!text) {
      return setError(<ErrorContainer title="Yorum girilmesi gereklidir." />);
    }

    const sendData = {
      text,
    };

    return props.handleSubmit(sendData);
  };

  return (
    <form onSubmit={onSubmit} className="w-full bg-white p-5">
      <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
      {error && error}
      <div className="flex flex-wrap  mb-3">
        <div className="w-full md:w-1/2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Başlık</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Yorum"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
