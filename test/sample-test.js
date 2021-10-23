const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Registry", () => {
  let deployer, merge;

  before(async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();
    const MergeFactory = await ethers.getContractFactory("Merge");
    merge = await MergeFactory.deploy();
    await merge.deployed();
  });

  it("should set the state variables on deployment", async () => {});
});
