/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";

import { useAppSelector, fromNewUserForm } from "../state";
import { selectors as select, submitForm, actions } from "../state/newUserForm";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useFormik } from "formik";
import { useFetch } from "react-async";
import { ApiBaseCtx } from "..";
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

export function NewUser(props: React.Props<{}>) {
  const history = useHistory();
  const apiBase = useContext(ApiBaseCtx);

  const { error, run } = useFetch<any>(
    `${apiBase}/users`,
    {
      method: "POST"
    },
    {
      defer: true,
      json: true,
      onResolve() {
        history.push(generatePath(PATH_MATCH, { page: 1 }));
      }
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      job: ""
    },
    onSubmit() {
      run(init => ({ ...init, body: JSON.stringify(formik.values) }));
    }
  });

  const classes = useStyles(props);

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {error && (
        <Typography variant="subtitle1" color="error">
          {error}
        </Typography>
      )}
      <TextField label="Name" {...formik.getFieldProps({ name: "name" })[0]} />
      <TextField label="Job" {...formik.getFieldProps({ name: "job" })[0]} />
      <Button type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
