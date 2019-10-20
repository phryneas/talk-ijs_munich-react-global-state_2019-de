import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

import "modern-css-reset";

export const ApiBaseCtx = React.createContext();

ReactDOM.render(
  <ApiBaseCtx.Provider value={"https://reqres.in/api"}>
    <Main />
  </ApiBaseCtx.Provider>,
  document.getElementById("root")
);
