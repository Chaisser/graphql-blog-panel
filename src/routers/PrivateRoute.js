import React, { useEffect, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/header/Header";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {}, [Component]);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="bg-gray-300 w-full h-full fixed" style={{ zIndex: "-10" }}></div>
      <Header />
      <Route
        {...rest}
        component={(props) => {
          return <Component token={token} {...props} />;
        }}
      />
    </Fragment>
  );
};

export default PrivateRoute;
