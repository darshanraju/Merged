import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import Hero from "./components/Hero";
// import StickyHeadTable from "./components/Issues";
import IssuesTable from "./components/IssuesTable";
import Statistics from "./components/Statistics";
import { theme } from "./providers/ThemeProvider";

declare let window: any;

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
    const ropsteinEndpoint =
      "wss://ropsten.infura.io/ws/v3/1f8da82842b144fd8b0677f547a37182";

    const web3 = new Web3(ropsteinEndpoint);

    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts: any) => {
          console.log("accounts: ", accounts);
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    }
  }, []);

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
