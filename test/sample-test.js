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

  it("Should fail when insufficient approval balance", async () => {
    const bountyAmount = 1000;
    const gitHubIssueLink = "www.google.com";
    const MorphwareTokenFactory = await ethers.getContractFactory(
      "MorphwareToken"
    );

    morphwareToken = await MorphwareTokenFactory.deploy();
    await morphwareToken.deployed();

    await expect(merge.createIssue(
      gitHubIssueLink,
      "Morphware",
      bountyAmount,
      morphwareToken.address,
      ["React", "Typescript", "Electron", "NodeJS"]
    )).to.be.revertedWith("Insufficient allowance");
  })

  //TODO: Need to complete this test
  it("Should fail when contract address provided is not an ERC20", async () => {})

  it("Cannot use the same issue more than once at any given time", async () => {
    const MorphwareTokenFactory = await ethers.getContractFactory(
      "MorphwareToken"
    );
    morphwareToken = await MorphwareTokenFactory.deploy();
    await morphwareToken.deployed();

    const bountyAmount = 10000;
    const gitHubIssueLink = "www.gumtree.com";

    await morphwareToken.approve(
      merge.address,
      bountyAmount
    );

    await morphwareToken.allowance(
      deployer.address,
      merge.address
    );

    await merge.createIssue(
      gitHubIssueLink,
      "Morphware",
      bountyAmount,
      morphwareToken.address,
      ["React", "Typescript", "Electron", "NodeJS"]
    );

    expect(await merge.getIssueCompany(gitHubIssueLink)).to.equal("Morphware");

    await morphwareToken.approve(
      merge.address,
      bountyAmount
    );

    await morphwareToken.allowance(
      deployer.address,
      merge.address
    );

    await expect(merge.createIssue(
      gitHubIssueLink,
      "Morphware",
      bountyAmount,
      morphwareToken.address,
      ["React", "Typescript", "Electron", "NodeJS"]
    )).to.be.revertedWith("This issue already exists");
    // .to.be.revertedWith("This issue already exists")
  })

  it("should be able to create an issue", async () => {
    const MorphwareTokenFactory = await ethers.getContractFactory(
      "MorphwareToken"
    );
    morphwareToken = await MorphwareTokenFactory.deploy();
    await morphwareToken.deployed();

    const bountyAmount = 10000;
    const gitHubIssueLink = "www.google.com";

    await morphwareToken.approve(
      merge.address,
      bountyAmount
    );

    await morphwareToken.allowance(
      deployer.address,
      merge.address
    );

    await merge.createIssue(
      gitHubIssueLink,
      "Morphware",
      bountyAmount,
      morphwareToken.address,
      ["React", "Typescript", "Electron", "NodeJS"]
    );

    expect(await merge.getIssueCompany(gitHubIssueLink)).to.equal("Morphware");
  });

  it("Register a developer successfully", async () => {
    const gitHubUser = "darshanraju";

    await merge.connect(addr1).addDeveloper(gitHubUser);

    expect(await merge.developers(gitHubUser)).to.equal(addr1.address);
  })

  it("Cannot register the same gitHub username twice", async () => {
    const gitHubUser = "darshanrajuV2";

    await merge.addDeveloper(gitHubUser);

    expect(await merge.developers(gitHubUser)).to.equal(deployer.address);

    await expect(merge.addDeveloper(gitHubUser)).to.be.revertedWith("This github user already registered");
  })

  it("Cannot payout to a developer who doesn't exist (invalid github username)", async () => {
    const gitHubUser = "johnSmith";
    const gitHubIssueLink = "www.google.com";

    await expect(merge.payout(gitHubUser, gitHubIssueLink)).to.be.revertedWith("Developer with this user doesn't exist")
  });

  it("Cannot payout to a developer when the issue is invalid", async () => {
    const gitHubUser = "darshanraju";
    const gitHubIssueLink = "www.invalidIssue.com";

    await expect(merge.payout(gitHubUser, gitHubIssueLink)).to.be.revertedWith("This issue doesn't exist")
  })

  it("only the creator of the issue can release bounty", async () => {
    const gitHubUser = "darshanraju";
    const gitHubIssueLink = "www.google.com";

    await expect(merge.connect(addr1).payout(gitHubUser, gitHubIssueLink)).to.be.revertedWith("Only the issue creator can release the bounty")
  })

  it("Successfully payout the developer", async () => {
    expect(await morphwareToken.balanceOf(addr1.address)).to.equal(0);

    const gitHubUser = "darshanraju";
    const gitHubIssueLink = "www.google.com";

    await merge.payout(gitHubUser, gitHubIssueLink);

    expect(await morphwareToken.balanceOf(addr1.address)).to.equal(10000);
  })
});
