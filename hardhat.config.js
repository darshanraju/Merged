require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "ropstein",
  networks: {
    hardhat: {},
    localhost: {},
    ropstein: {
      url: "https://ropsten.infura.io/v3/1f8da82842b144fd8b0677f547a37182",
      accounts: [
        "cc5fb6d661b791851ad5cbbd9ca1611fd131acc03f1a66e03076d32c315cae72",
      ],
      saveDeployments: true,
    },
  },
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    version: "0.8.4",
  },
};
