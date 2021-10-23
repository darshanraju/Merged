//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Merge {
    
    enum { Solidity, Typescript, Python, Java } languages;
    enum { React, Vue, Node, Django, Truffle, HardHat, Spring} frameworks;

    struct TechStack {
        programmingLanguage languages;
        framework frameworks;
    }

    struct Issue {
        string gitHubLink;
        bountyValue uint32;
        bountyToken address;
        techStacks TechStack;
        active bool;
    }

    mapping(string => address) public developers;

    //String will be link to the github issue
    mapping(string => issue) public issues;

    constructor() {}

    
    function createIssue(string gitHubIssueLink, uint32 bountyValue, address bountyToken,TechStack techStacks) public view {
        require(issues[gitHubIssueLink].active != false, "This issue already exists");
        //Hold the funds
        //Do we set an allowance on the token contract for this contract to spend 'bountyValue' of tokens
        //Create the issue
        issues[gitHubIssueLink] = Issue(gitHubIssueLink, bountyValue, bountyToken, techStacks, true); 
    }
}
