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

type registerDeveloper = () => Promise<void>;
type createIssue = (issueArgs: ICreateIssue) => Promise<void>;
type payDeveloper = () => Promise<void>;

interface ICreateIssue {
  gitHubIssueLink: string;
  company: string;
  bountyValue: number;
  tokenContract: string;
  techStacks: Array<string>;
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
    if (!MergeContract) {
      console.log("MergeContract not defined");
      return;
    }
    let techStacksReduced;
    if (techStacks.length > 4) {
      techStacksReduced = techStacks.splice(0, 4);
    }

    //TODO: Validate that its an ERC20 token contract
    //TODO: Validate its an open githubIssue

    MergeContract.methods
      .createIssue(
        gitHubIssueLink,
        company,
        bountyValue,
        tokenContract,
        techStacksReduced
      )
      .send({ from: account });
  };
  const payDeveloper = async () => {};
  const registerDeveloper = async () => {};

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
