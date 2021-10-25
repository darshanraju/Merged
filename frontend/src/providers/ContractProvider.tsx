/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import init, { getAccount, getMergeContract } from "../Web3Client";
import { Contract } from "web3-eth-contract";

interface IContracts {
  mergeContract: {
    registerDeveloper: registerDeveloper;
    createIssue: createIssue;
    payDeveloper: payDeveloper;
  };
}

export const ContractsContext = React.createContext({} as IContracts);

type registerDeveloper = (gitHubUserName: string) => Promise<void>;
type createIssue = ({
  company,
  bountyValue,
  gitHubIssueLink,
  techStacks,
  tokenContract,
}: ICreateIssue) => Promise<void>;
type payDeveloper = (payDeveloperArgs: IPayout) => Promise<void>;

export interface ICreateIssue {
  company: string;
  techStacks: Array<string>;
  gitHubIssueLink: string;
  tokenContract: string;
  bountyValue: number;
}

interface IPayout {
  gitHubUserName: string;
  gitHubIssueLink: string;
}

const ContractsProvider: React.FC = ({ children }) => {
  const [web3, setWeb3] = useState<Web3>();
  const [account, setAccount] = useState<string>();
  const [MergeContract, setMergeContract] = useState<Contract>();

  const initWeb3 = async () => {
    const web3Client = await init();
    setWeb3(web3Client);
  };

  const getMergeContractWrapper = async () => {
    if (!web3) return;
    const mergeContract = await getMergeContract(web3);
    setMergeContract(mergeContract);
  };

  const getAccountWrapper = async () => {
    const account = await getAccount();
    setAccount(account);
  };

  useEffect(() => {
    initWeb3();
  }, []);

  useEffect(() => {
    getMergeContractWrapper();
    getAccountWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3]);

  const createIssue = async ({
    bountyValue,
    company,
    gitHubIssueLink,
    techStacks,
    tokenContract,
  }: ICreateIssue) => {
    console.log("techSstacks : ", techStacks);

    if (!MergeContract) {
      console.log("MergeContract not defined");
      return;
    }
    let techStacksReduced;
    if (techStacks.length > 4) {
      techStacksReduced = techStacks.splice(0, 4);
    } else {
      techStacksReduced = techStacks;
    }

    //TODO: Validate that its an ERC20 token contract
    //TODO: Validate its an open githubIssue

    console.log("VALUES");
    console.log("gitHubIssueLink", gitHubIssueLink);
    console.log("company", company);
    console.log("bountyValue", bountyValue);
    console.log("tokenContract", tokenContract);
    console.log("techStacksReduced", techStacksReduced);

    console.log("Account: ", account);

    return await MergeContract.methods
      .createIssue(
        gitHubIssueLink,
        company,
        bountyValue,
        tokenContract,
        techStacksReduced
      )
      .call({ from: account });
  };

  const registerDeveloper = async (gitHubUserName: string) => {
    if (!MergeContract) {
      console.log("MergeContract not defined");
      return;
    }
    MergeContract.methods.addDeveloper(gitHubUserName).call({ from: account });
  };

  const payDeveloper = async ({ gitHubUserName, gitHubIssueLink }: IPayout) => {
    if (!MergeContract) {
      console.log("MergeContract not defined");
      return;
    }

    MergeContract.methods
      .payout(gitHubUserName, gitHubIssueLink)
      .call({ from: account });
  };

  const contractsProvider: IContracts = {
    mergeContract: {
      createIssue: createIssue,
      registerDeveloper: registerDeveloper,
      payDeveloper: payDeveloper,
    },
  };

  return (
    <ContractsContext.Provider value={contractsProvider}>
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsProvider;
