import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
    Container
  } from '@material-ui/core';

  const useStyles = makeStyles((theme: any) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  }));

export default function BasePage(props: any){
    const classes = useStyles();
    return (
        <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Books
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
              {props.children}
    </main>
  </React.Fragment>
    )
}