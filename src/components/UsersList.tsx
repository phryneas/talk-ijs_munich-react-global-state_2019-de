import React, { useEffect } from "react";
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
  selectors as select
} from "../state/usersListApi";
import clsx from "clsx";
import { useDispatch } from "react-redux";

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
  const status = useAppSelector(fromUsersList(select.status));
  const users = useAppSelector(fromUsersList(select.users));
  const error = useAppSelector(fromUsersList(select.error));
  const page = useAppSelector(fromUsersList(select.page));
  const classes = useStyles(props);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === ApiStatus.uninitialized) {
      dispatch(loadUsers(0));
    }
  }, [status, dispatch]);

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
            users.map(user => (
              <TableRow
                key={user.id}
                className={clsx({
                  [classes.loading]: status === ApiStatus.loading
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
                {status === ApiStatus.loading ? (
                  "loading"
                ) : status === ApiStatus.loaded ? (
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
          <Button onClick={() => dispatch(loadUsers(page - 1))}>back</Button>
          Page {page}
          <Button onClick={() => dispatch(loadUsers(page + 1))}>forward</Button>
        </Typography>
      )}
    </Paper>
  );
}
