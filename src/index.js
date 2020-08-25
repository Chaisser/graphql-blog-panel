import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import AppRouter from "./routers/AppRouter";

import "./styles/tailwind.css";
import "./styles/styles.scss";

localStorage.setItem("language", "tr");

ReactDOM.render(<AppRouter />, document.getElementById("root"));

serviceWorker.unregister();
