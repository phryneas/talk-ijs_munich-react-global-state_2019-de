/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useContext } from "react";
import { useAppSelector, fromUsersList } from "../state";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import {
  ApiStatus,
  loadUsersThunk as loadUsers,
  selectors as select,
  navigateTo,
  User,
  PATH_MATCH
} from "../state/usersListApi";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { useFetch } from "react-async";
import { useParams, useHistory, generatePath } from "react-router";

const useStyles = makeStyles({
  paper: {
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  loading: {
    opacity: 0.5
  }
});

export function UsersList(props: React.Props<{}>) {
  const isLoading = useAppSelector(fromUsersList(select.isLoading));
  const isLoaded = useAppSelector(fromUsersList(select.isLoaded));
  const users = useAppSelector(fromUsersList(select.users));
  const error = useAppSelector(fromUsersList(select.error));
  const page = useAppSelector(fromUsersList(select.page));
  const classes = useStyles(props);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof page !== "undefined") {
      dispatch(loadUsers(page));
    }
  }, [dispatch, page]);

  function navigateToLastPage() {
    if (page) {
      dispatch(navigateTo(page - 1));
    }
  }
  function navigateToNextPage() {
    if (page) {
      dispatch(navigateTo(page + 1));
    }
  }

  return (
    <Paper className={classes.paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(users &&
            users.length > 0 &&
            users.map((user: User) => (
              <TableRow
                key={user.id}
                className={clsx({
                  [classes.loading]: isLoading
                })}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))) || (
            <TableRow className={classes.loading}>
              <TableCell rowSpan={4} component="th" scope="row">
                {isLoading ? (
                  "loading"
                ) : isLoaded ? (
                  "no data"
                ) : error ? (
                  <>Error: {error}</>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {page && (
        <Typography>
          <Button onClick={navigateToLastPage}>back</Button>
          Page {page}
          <Button onClick={navigateToNextPage}>forward</Button>
        </Typography>
      )}
    </Paper>
  );
}
