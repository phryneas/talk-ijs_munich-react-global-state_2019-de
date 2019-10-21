//#region
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";

import { useAppSelector, fromNewUserForm } from "../state";
import { selectors as select, submitForm, actions } from "../state/newUserForm";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useFormik } from "formik";
import { useFetch } from "react-async";
import { navigateTo, PATH_MATCH } from "../state/usersListApi";
import { useHistory, generatePath } from "react-router";

const useStyles = makeStyles({
  form: {
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column"
  }
});
//#endregion

export function NewUser(props: React.Props<{}>) {
  const name = useAppSelector(fromNewUserForm(select.name));
  const job = useAppSelector(fromNewUserForm(select.job));
  const isSubmitting = useAppSelector(fromNewUserForm(select.isSubmitting));
  const error = useAppSelector(fromNewUserForm(select.error));

  const dispatch = useDispatch();

  const classes = useStyles(props);

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        dispatch(submitForm());
      }}
    >
      {error && (
        <Typography variant="subtitle1" color="error">
          {error}
        </Typography>
      )}
      <TextField
        label="Name"
        value={name}
        onChange={e => dispatch(actions.nameChanged(e.target.value))}
      />
      <TextField
        label="Job"
        value={job}
        onChange={e => dispatch(actions.jobChanged(e.target.value))}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
