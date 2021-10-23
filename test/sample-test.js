const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Merge", () => {
  let deployer, merge;

  before(async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();
    const MergeFactory = await ethers.getContractFactory("Merge");
    merge = await MergeFactory.deploy();
    await merge.deployed();
  });

  it("should be able to deploy contract", async () => {});

  it("should be able to create an issue", async () => {
    const MorphwareTokenFactory = await ethers.getContractFactory(
      "MorphwareToken"
    );
    morphwareToken = await MorphwareTokenFactory.deploy();
    await morphwareToken.deployed();

    console.log("Address: ", morphwareToken.address);

    const bountyAmount = 10000;

    const t = await morphwareToken.approve(
      morphwareToken.address,
      bountyAmount
    );

    console.log("T ", t);

    console.log("Deployer: ", deployer);

    const allowance = await morphwareToken.allowance(
      deployer.address,
      morphwareToken.address
    );

    console.log("allowance: ", allowance.toString());

    await merge.createIssue(
      "www.google.com",
      "Morphware",
      bountyAmount,
      morphwareToken.address,
      ["React", "Typescript", "Electron", "NodeJS"]
    );
  });
});
