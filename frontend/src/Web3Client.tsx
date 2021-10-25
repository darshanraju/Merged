import web3 from "web3";
import Web3 from "web3";
import MergeContract from "./contracts/Merge.json";

declare let window: any;
let provider = window.ethereum;

const init = async () => {
  const ropsteinEndpoint =
    "wss://ropsten.infura.io/ws/v3/1f8da82842b144fd8b0677f547a37182";

  // const provider = new Web3.providers.WebsocketProvider(conf.ethAddress);
  const infuraProvider = new Web3.providers.WebsocketProvider(ropsteinEndpoint);
  const web3 = new Web3(infuraProvider);

  // const web3 = new Web3(ropsteinEndpoint);

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

  return web3;
};

export const getMergeContract = async (web3: web3) => {
  const mergeContractABI: any = MergeContract.abi;
  const myContract = new web3.eth.Contract(
    mergeContractABI,
    // "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
    "0x757754feCb95912279b3184a31fFF478492B40C5"
  );
  return myContract;
};

export const getAccount = async () => {
  if (typeof provider !== "undefined") {
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      console.log("getAccountHelper: ", accounts);
      return accounts[0];
    } catch (error) {
      console.log("Error: ", error);
    }
  }
};

export default init;
