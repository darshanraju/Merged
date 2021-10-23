//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";  
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract Merge {

    ERC20 public ERC20Interface;

    struct Issue {
        string gitHubLink;
        string company;
        uint32 bountyValue;
        address tokenContract;
        string[4] techStacks; //Can select up to 4 stacks/languages/frameworks
        bool active;
    }

    mapping(string => address) public developers;
    mapping(string => Issue) public issues;

    event IssueCreationSuccessful(address indexed issueCreator, uint256 bounty);  

    constructor() {}

    /// @notice Allow a repo contibutor/owner to create a issue bounty
    /// @dev The native token amount (bounty) is transferred into this contract and a new issue is created
    /// @param gitHubIssueLink a URI link to the open gitHubIssue
    /// @param company the name of the company who owns the repository the issue belongs to
    /// @param bountyValue the amount of ERC20 tokens in the bounty
    /// @param tokenContract the ERC20 contract address
    /// @param techStacks languages and frameworks required to solve the the related issue
    function createIssue(string memory gitHubIssueLink, string memory company, uint32 bountyValue, address tokenContract, string[4] memory techStacks) public {
        require(issues[gitHubIssueLink].active !=  false, "This issue already exists");

        //Map tokenContract to IERC20
        ERC20Interface  = ERC20(tokenContract);

        //Verify sender has sufficient allowance for bounty
        require(bountyValue <= ERC20Interface.allowance(msg.sender, address(this)), "Insufficient allowance");

        //Transfer funds to the contract
        ERC20Interface.transferFrom(msg.sender, address(this), bountyValue);  

        //Create the issue
        issues[gitHubIssueLink] = Issue(gitHubIssueLink, company, bountyValue, tokenContract, techStacks, true); 


        //Emit successfull event
        emit IssueCreationSuccessful(msg.sender, bountyValue);  
    }
}
