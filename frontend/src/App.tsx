import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import "./App.css";
import Hero from "./components/Hero";
// import StickyHeadTable from "./components/Issues";
import IssuesTable from "./components/IssuesTable";
import Statistics from "./components/Statistics";
import { theme } from "./providers/ThemeProvider";

const styles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: theme.background?.main,
      width: "100vw",
      height: "200vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {},
  })
);

const App = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Grid container style={{ width: "80%" }}>
        <Hero />
        <IssuesTable />
      </Grid>
    </div>
  );
};

export default App;
