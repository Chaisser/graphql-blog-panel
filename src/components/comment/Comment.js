import React, { useState, useEffect, Fragment } from "react";
import { history } from "./../../routers/AppRouter";
import SubMenu from "./../header/SubMenu";
import Loading from "./../ui/Loading";
import Container from "./../ui/Container";
import All from "./All";
import Edit from "./Edit";
import { blogs } from "./../../navigation/navigation";

export default () => {
  const [component, setComponent] = useState(<Loading />);
  const pathname = history.location.pathname.split("/")[2];

  useEffect(() => {
    switch (pathname) {
      case "edit":
        setComponent(<Edit dataId={history.location.pathname.split("/")[3]} />);
        break;
      default:
        setComponent(<All />);
    }
  }, [pathname]);

  return (
    <Fragment>
      <SubMenu data={blogs} />
      <Container>{component}</Container>
    </Fragment>
  );
};
