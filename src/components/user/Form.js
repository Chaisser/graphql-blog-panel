import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorContainer from "./../ui/ErrorContainer";

export default (props) => {
  const [error, setError] = useState("");

  const [name, setName] = useState(props.data ? props.data.name : "");

  const [email, setEmail] = useState(props.data ? props.data.email : "");
  const [userType, setUserType] = useState(props.data ? props.data.userType : "");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      return setError(<ErrorContainer title="İsim girilmesi gereklidir." />);
    }

    if (!email) {
      return setError(<ErrorContainer title="E-posta adresi girilmesi gereklidir" />);
    }

    if (!userType) {
      return setError(<ErrorContainer title="Kullanıcı rolü seçilmesi gereklidir" />);
    }

    if ((password || !props.data) && password.length < 6) {
      return setError(<ErrorContainer title="Minimum 6 haneli şifre girilmesi gereklidir" />);
    }

    const sendData = {
      name,
      email,
      password: password.length === 0 ? null : password,
      userType,
    };

    return props.handleSubmit(sendData);
  };

  return (
    <form onSubmit={onSubmit} className="w-full bg-white p-5">
      <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
      {error && error}
      <div className="flex flex-wrap  mb-3">
        <div className="w-full md:w-1/2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">İsim Soyisim</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="İsim Soyisim"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap  mb-3">
        <div className="w-full md:w-1/2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">E-posta</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap  mb-3">
        <div className="w-full md:w-1/2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
            Kullanıcı Rolü
          </label>
          <div className="relative">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="user-role"
            >
              <option value="USER">USER</option>
              <option value="MODERATOR">MODERATOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap  mb-3">
        <div className="w-full md:w-1/2 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Şifre</label>
          <div className="relative w-full">
            <input
              className="appearance-none  block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type={passwordVisible ? "text" : "password"}
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute"
              style={{ top: "10px", right: "5px" }}
            >
              {passwordVisible ? <AiOutlineEyeInvisible className="text-2xl" /> : <AiOutlineEye className="text-2xl" />}
            </div>
          </div>
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
