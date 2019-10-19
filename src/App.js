import React from "react";
import Layout from "./components/Layout";
import { Button } from "@material-ui/core";

export function App() {
  return (
    <Layout title="Demo" buttons={<Button color="inherit">Login</Button>}>
      asd
    </Layout>
  );
}
