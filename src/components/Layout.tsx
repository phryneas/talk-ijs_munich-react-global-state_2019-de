import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  main: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function Layout({
  buttons,
  title,
  children
}: React.PropsWithChildren<{
  title: React.ReactNode;
  buttons: React.ReactNode;
}>) {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {buttons}
        </Toolbar>
      </AppBar>
      <Container component="main" className={classes.main}>
        {children}
      </Container>
    </div>
  );
}
