//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract Merge {

    ERC20 public ERC20Interface;

    struct Issue {
        address creator;
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
    event DeveloperRegistered(address indexed developer, string indexed githubUser); 

    constructor() {}

    /// @notice Allow a repo contibutor/owner to create a issue bounty
    /// @dev The native token amount (bounty) is transferred into this contract and a new issue is created
    /// @param gitHubIssueLink a URI link to the open gitHubIssue
    /// @param company the name of the company who owns the repository the issue belongs to
    /// @param bountyValue the amount of ERC20 tokens in the bounty
    /// @param tokenContract the ERC20 contract address
    /// @param techStacks languages and frameworks required to solve the the related issue
    function createIssue(string memory gitHubIssueLink, string memory company, uint32 bountyValue, address tokenContract, string[4] memory techStacks) public {
        require(issues[gitHubIssueLink].active ==  false, "This issue already exists");

        //Map tokenContract to IERC20
        ERC20Interface  = ERC20(tokenContract);

        uint256 allowance = ERC20Interface.allowance(msg.sender, address(this));

        console.log("Allowance: ", allowance);
        console.log("Value: ", gitHubIssueLink);

        //Verify sender has sufficient allowance for bounty
        require(bountyValue <= allowance, "Insufficient allowance");

        //Transfer funds to the contract
        ERC20Interface.transferFrom(msg.sender, address(this), bountyValue);  

        //Create the issue
        issues[gitHubIssueLink] = Issue(msg.sender, gitHubIssueLink, company, bountyValue, tokenContract, techStacks, true); 

        // console.log("ISSUE ", issues[gitHubIssueLink]);

        //Emit successfull event
        emit IssueCreationSuccessful(msg.sender, bountyValue);  
    }

    /// @notice Allow a developer to register
    /// @dev Adds the developers github username in a mapping to their address
    /// @param gitHubUserName the developers github user name
    function addDeveloper(string memory gitHubUserName) public {
        require(developers[gitHubUserName] == address(0), "This github user already registered");
        developers[gitHubUserName] = msg.sender;
        emit DeveloperRegistered(msg.sender, gitHubUserName);
    }


    /// @notice Allow a issue creator to release funds to the github user who solves the issue
    /// @dev Transfers the native token bounty to the developer and deletes the issue from mapping
    /// @param gitHubUserName the developers github user name
    /// @param gitHubIssueLink the github issue which was solved
    function payout(string memory gitHubUserName, string memory gitHubIssueLink) public {
        require(developers[gitHubUserName] != address(0), "Developer with this user doesn't exist");
        require(issues[gitHubIssueLink].active == true, "This issue doesn't exist");
        require(issues[gitHubIssueLink].creator == msg.sender, "Only the issue creator can release the bounty");

        //Pay the developer
        address bountyTokenContract = issues[gitHubIssueLink].tokenContract;
        uint256 bountyAmount = issues[gitHubIssueLink].bountyValue;

        address developerAddress = developers[gitHubUserName];

        ERC20Interface = ERC20(bountyTokenContract);
        ERC20Interface.transfer(developerAddress, bountyAmount);

        //Remove the saved issue

        //TODO: Maybe we can save completed tasks, or have a counter of the completed tasks
        // Or store the stats of the amount of closed tasks for each framework/language
        delete issues[gitHubIssueLink];

        //Update the developers stats
        //TODO: A V2 feature
    }

    function getIssueCompany(string memory gitHubIssueLink) public view returns (string memory) {
        return issues[gitHubIssueLink].company;
    }
}
