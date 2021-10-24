import { Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import IssuesTable from "./components/IssuesTable";
import ContractsProvider from "./providers/ContractProvider";
import { theme } from "./providers/ThemeProvider";
import init from "./Web3Client";

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

  useEffect(() => {
    init();
  }, []);

  return (
    <ContractsProvider>
      <div className={classes.root}>
        <Grid container style={{ width: "80%" }}>
          <Hero />
          <IssuesTable />
        </Grid>
      </div>
    </ContractsProvider>
  );
};

export default App;
