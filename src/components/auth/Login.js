import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGINUSER } from "./../../gql/auth/mutation";
import { history } from "./../../routers/AppRouter";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginUser] = useMutation(LOGINUSER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser({
        variables: { email, password },
      });
      if (result) {
        const token = result.data.loginUser.token;
        localStorage.setItem("token", token);
        history.push("/dashboard");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.graphQLErrors[0].message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center mb-3">
            <img alt="Le Garaj Admin" src={require("./../../assets/img/logo.png")} />
          </div>

          {error && <p className="text-red-500 text-sm text-center my-2">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              E-Mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Giriş
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2020 İnteraktif İş İnternet Hizmetleri</p>
      </div>
    </div>
  );
};

export default Login;
