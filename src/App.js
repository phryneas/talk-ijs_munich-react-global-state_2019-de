/* eslint-disable no-unused-vars */

import React from "react";
import Layout from "./components/Layout";
import { Button } from "@material-ui/core";
import { UsersList } from "./components/UsersList";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { NewUser } from "./components/NewUser";
import { Route, Switch, Redirect, generatePath } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { PATH_MATCH } from "./state/usersListApi";

export function App() {
  const page1Link = generatePath(PATH_MATCH, { page: 1 });
  return (
    <BrowserRouter>
      <Layout
        title="Demo"
        buttons={
          <>
            <Link to="/new">
              <Button>New</Button>
            </Link>
            <Link to={page1Link}>
              <Button>List</Button>
            </Link>
          </>
        }
      >
        <Switch>
          <Route path="/new" exact>
            <NewUser />
          </Route>
          <Route path={PATH_MATCH}>
            <UsersList />
          </Route>
          <Redirect to={page1Link} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
