import React from "react";
import Layout from "./components/Layout";
import { Button } from "@material-ui/core";
import { UsersList } from "./components/UsersList";

import { store } from "./state";
import { Provider } from "react-redux";

export function App() {
  return (
    <Provider store={store}>
      <Layout title="Demo" buttons={<Button color="inherit">Login</Button>}>
        <UsersList />
      </Layout>
    </Provider>
  );
}
