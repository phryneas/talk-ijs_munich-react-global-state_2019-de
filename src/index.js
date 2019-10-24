//#region
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

import "modern-css-reset";
import { createBrowserHistory } from "history";
import { createStore } from "./state";
//#endregion

export const history = createBrowserHistory({basename: process.env.PUBLIC_URL});

const store = createStore({ history, apiBase: "https://reqres.in/api" });

ReactDOM.render(
  <Main history={history} store={store} />,
  document.getElementById("root")
);
