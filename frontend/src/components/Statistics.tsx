import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";

function Statistics() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Box
          style={{
            border: "2px solid #61dafb",
            width: "20%",
            borderRadius: "5%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h2" color="primary">
              102
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              Open Issues
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default Statistics;
