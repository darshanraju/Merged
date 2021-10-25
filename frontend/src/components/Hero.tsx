import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import Logo from "../assets/Logo.png";
import NavButtons from "./NavButtons";

interface IStats {
  stat: number;
  text: string;
}

const Stats = ({ stat, text }: IStats) => {
  return (
    <Grid item xs={12} style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          color="secondary"
          style={{ textAlign: "center" }}
        >
          {stat}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          color="primary"
          style={{ textAlign: "center" }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

const Hero = () => {
  return (
    <React.Fragment>
      <Grid
        item
        xs={2}
        style={{
          padding: "50px 30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <img src={Logo} alt="Morphware Logo" height="60%" />
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h1"
          color="secondary"
          style={{ textAlign: "left", padding: "50px 0px" }}
        >
          Merged
        </Typography>
      </Grid>
      <NavButtons />
      <Grid item xs={8}>
        <Grid item xs={12} style={{ paddingBottom: "40px" }}>
          <Typography
            variant="h1"
            color="primary"
            style={{ textAlign: "left" }}
          >
            The solution for incentivised open-source blockchain development
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: "30px" }}>
          <Typography
            variant="h4"
            color="primary"
            style={{ textAlign: "left" }}
          >
            Discover, choose and solve open Github Issues in open-source
            blockchain projects and get rewarded in crypto. Solve real problems
            that teams are currently facing and begin your journey in
            contributing to the future of Web3.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Stats stat={102} text="Active Issues" />
        <Stats stat={23} text="Web3 Teams" />
      </Grid>
      <Grid item xs={4}></Grid>
    </React.Fragment>
  );
};

export default Hero;
