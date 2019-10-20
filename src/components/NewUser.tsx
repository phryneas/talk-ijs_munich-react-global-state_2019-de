import React from "react";

import { useAppSelector, fromNewUserForm } from "../state";
import { selectors as select, submitForm, actions } from "../state/newUserForm";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";

export function NewUser(props: React.Props<{}>) {
  const name = useAppSelector(fromNewUserForm(select.name));
  const job = useAppSelector(fromNewUserForm(select.job));
  const isSubmitting = useAppSelector(fromNewUserForm(select.isSubmitting));
  const error = useAppSelector(fromNewUserForm(select.error));

  const dispatch = useDispatch();

  return (
    <form
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
        label="name"
        value={name}
        onChange={e => dispatch(actions.nameChanged(e.target.value))}
      />
      <TextField
        label="job"
        value={job}
        onChange={e => dispatch(actions.jobChanged(e.target.value))}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
