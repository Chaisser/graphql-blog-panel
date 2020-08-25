import React, { useState, useEffect, Fragment } from "react";
import { history } from "./../../routers/AppRouter";
import SubMenu from "./../header/SubMenu";
import Loading from "./../ui/Loading";
import Container from "./../ui/Container";
import All from "./All";
import Add from "./Add";
import Edit from "./Edit";
import { users } from "./../../navigation/navigation";

const User = () => {
  const [component, setComponent] = useState(<Loading />);
  const pathname = history.location.pathname.split("/")[2];

  useEffect(() => {
    switch (pathname) {
      case "add":
        setComponent(<Add />);
        break;
      case "edit":
        setComponent(<Edit dataId={history.location.pathname.split("/")[3]} />);
        break;
      default:
        setComponent(<All />);
    }
  }, [pathname]);

  return (
    <Fragment>
      <SubMenu data={users} />
      <Container>{component}</Container>
    </Fragment>
  );
};

export default User;
