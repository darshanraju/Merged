import React, { useState } from "react";
import {
  Table,
  Column,
  AutoSizer,
  SortDirection,
  SortDirectionType,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { IconButton, Grid, makeStyles, Typography } from "@material-ui/core";
import { theme } from "../providers/ThemeProvider";
import GitHubIcon from "@mui/icons-material/GitHub";

// import "./IssuesTable.css";
const styles = makeStyles({
  tableHeader: {
    color: "#61dafb",
    fontSize: "50px",
    fontWeight: 600,
    padding: "50px",
  },
  tableRow: {
    color: "white",
    fontSize: "30px",
    fontWeight: 200,
    // padding: "20px"
  },
});

//Issues collums = Company | Stacks | Bounty | howManyPeopleForked? | deadline?

interface IBounty {
  amount: string;
  symbol: string;
  tokenAddress: string;
}

interface Iissues {
  company: string;
  stacks: Array<string>;
  bounty: IBounty;
  gitHubIssue: string;
}

const mockIssues: Array<Iissues> = [
  {
    company: "Morphware",
    bounty: {
      amount: "500000",
      symbol: "MWT",
      tokenAddress: "0xbc40e97e6d665ce77e784349293d716b030711bc",
    },
    stacks: ["React", "Typescript", "Electron", "Web3js"],
    gitHubIssue: "https://github.com/MetaMask/metamask-extension/issues/10287",
  },
  {
    company: "FileCoin",
    bounty: {
      amount: "400",
      symbol: "FIL",
      tokenAddress: "0xbc40e97e6d665ce77e784349293d716b030711bc",
    },
    stacks: ["Rust", "Typescript", "Solidity", "Web3js"],
    gitHubIssue: "https://github.com/MetaMask/metamask-extension/issues/10287",
  },
  {
    company: "BitCoin",
    bounty: {
      amount: "420",
      symbol: "BTC",
      tokenAddress: "0xbc40e97e6d665ce77e784349293d716b030711bc",
    },
    stacks: ["Hey", "Hey", "HEYYYYY", "BITCONNNECTTT"],
    gitHubIssue: "https://github.com/MetaMask/metamask-extension/issues/10287",
  },
];

const IssuesTable = () => {
  const [sortBy, setSortBy] = useState("company");
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirection.ASC
  );
  const classes = styles();

  const issues: Array<Iissues> = mockIssues;

  const sortedIssues = issues.sort(
    sortByProperty(sortBy, sortDirection === SortDirection.ASC ? 1 : -1)
  );

  const genericCell = ({ cellData }: any) => {
    console.log("inside generic cell for: ", cellData);
    if (cellData == null)
      return (
        <span className="dib o-40 no-select" style={{ width: "100%" }}>
          -
        </span>
      );
    return (
      <span className="dib no-select" style={{ width: "100%" }}>
        {cellData}
      </span>
    );
  };

  const stacksCell = ({ cellData }: any) => {
    if (cellData == null)
      return (
        <span className="dib o-40 no-select" style={{ width: "100%" }}>
          -
        </span>
      );
    const stacks = cellData.join(" | ");
    return (
      <span className="dib o-40 no-select" style={{ width: "100%" }}>
        {stacks}
      </span>
    );
  };

  const bountyCell = ({ cellData }: any) => {
    if (cellData == null)
      return (
        <span className="dib o-40 no-select" style={{ width: "100%" }}>
          -
        </span>
      );
    const bountyData: IBounty = cellData;
    return (
      <span className="dib o-40 no-select" style={{ width: "100%" }}>
        {bountyData.amount} {bountyData.symbol}
      </span>
    );
  };

  const gitHubIssue = ({ cellData }: any) => {
    if (cellData == null)
      return (
        <span className="dib o-40 no-select" style={{ width: "100%" }}>
          -
        </span>
      );
    return (
      <IconButton
        onClick={() => window.open(cellData)}
        style={{ width: "50%", fontSize: "50px" }}
      >
        <GitHubIcon fontSize="inherit" color="secondary" />
      </IconButton>
    );
  };

  const sort = ({
    sortBy,
    sortDirection,
  }: {
    sortBy: string;
    sortDirection: SortDirectionType;
  }) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  };
  function sortByProperty(property: any, dir = 1) {
    // @ts-ignore - `a` and `b` may not be numbers
    return ({ [property]: a }, { [property]: b }) =>
      // @ts-ignore - `a` and `b` may not be numbers
      (a == null) - (b == null) || dir * +(a > b) || dir * -(a < b);
  }
  console.log("Sorted Issues: ", sortedIssues);

  return (
    <Grid item xs={12}>
      <div style={{ width: "100%", padding: "20px" }}>
        <Typography variant="body1">
          <AutoSizer disableHeight style={{ width: "100%" }}>
            {({ width }: { width: number }) => (
              <Table
                // rowClassName="react_virtualised_row_custom"
                width={width}
                height={400}
                headerHeight={100}
                rowHeight={100}
                rowCount={sortedIssues.length}
                rowGetter={({ index }: { index: number }) =>
                  sortedIssues[index]
                }
                sortBy={sortBy}
                sortDirection={sortDirection}
                sort={sort}
                headerClassName={classes.tableHeader}
                rowClassName={classes.tableRow}
                // rowStyle={classes.tableRow}
              >
                <Column
                  label="Company"
                  cellRenderer={genericCell}
                  dataKey="company"
                  width={width * 0.2}
                />
                <Column
                  label="Stacks"
                  cellRenderer={stacksCell}
                  dataKey="stacks"
                  width={width * 0.5}
                />
                <Column
                  label="Bounty"
                  cellRenderer={bountyCell}
                  dataKey="bounty"
                  width={width * 0.2}
                />
                <Column
                  label="Solve"
                  cellRenderer={gitHubIssue}
                  dataKey="gitHubIssue"
                  width={width * 0.1}
                />
              </Table>
            )}
          </AutoSizer>
        </Typography>
      </div>
    </Grid>
  );
};

export default IssuesTable;
