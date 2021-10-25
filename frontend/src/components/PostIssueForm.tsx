import React, { useContext } from "react";
import { ContractsContext, ICreateIssue } from "../providers/ContractProvider";
import { Form } from "react-final-form";
import { TextField, Select } from "mui-rff";
import {
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Chip,
} from "@material-ui/core";

const techStacks = [
  "React",
  "Typescript",
  "Electron",
  "NodeJS",
  "Solidity",
  "Rust",
  "Vue",
  "Truffle",
  "HardHat",
];

const PostIssueForm = () => {
  const contractService = useContext(ContractsContext);
  const onSubmit = async (data: any) => {
    const createIssue = data as ICreateIssue;
    console.log("createIssue: ", createIssue);

    const response = await contractService.mergeContract.createIssue(
      createIssue
    );
    console.log("response: ", response);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent="center">
            <Typography variant="body2">Company</Typography>
            <TextField
              name="company"
              required={true}
              type="text"
              variant="outlined"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "15px 0px",
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Typography variant="body2">Tech Stacks</Typography>
            <Select
              name="techStacks"
              multiple
              formControlProps={{ margin: "normal" }}
              renderValue={(selected: Array<string>) => (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ margin: "3px" }} />
                  ))}
                </Box>
              )}
            >
              {techStacks.map((techstack) => (
                <MenuItem value={techstack}>{techstack}</MenuItem>
              ))}
            </Select>
            <Typography variant="body2">GitHub Issue</Typography>
            <TextField
              name="gitHubIssueLink"
              required={true}
              type="text"
              variant="outlined"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "15px 0px",
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Typography variant="body2">Token Contract</Typography>
            <TextField
              name="tokenContract"
              required={true}
              type="text"
              variant="outlined"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "15px 0px",
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Typography variant="body2">Bounty Value</Typography>
            <TextField
              name="bountyValue"
              required={true}
              type="text"
              variant="outlined"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "15px 0px",
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
            >
              Create Issue
            </Button>
          </Grid>
        </form>
      )}
    />
  );
};

export default PostIssueForm;
