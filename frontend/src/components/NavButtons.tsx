import { Button, Typography, Grid } from "@material-ui/core";
import React, { useState } from "react";
import PostIssueModal from "./PostIssueModal";

const NavButtons = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <React.Fragment>
      {showModal && (
        <PostIssueModal showModal={showModal} closeModal={closeModal} />
      )}
      <Grid
        xs={6}
        style={{
          paddingTop: "50px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          style={{
            height: "fit-Content",
            marginRight: "30px",
            borderWidth: "5px",
            borderRadius: "10px",
          }}
          onClick={openModal}
        >
          <Typography variant="h3" style={{ color: "white" }}>
            Post Issue
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{
            height: "fit-Content",
            borderWidth: "5px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h3" style={{ color: "white" }}>
            Stats
          </Typography>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default NavButtons;
