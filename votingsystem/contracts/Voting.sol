// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Candidate[] public candidates;
    uint public votingEndTime;

    constructor(string[] memory candidateNames, uint durationMinutes) {
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
        votingEndTime = block.timestamp + (durationMinutes * 1 minutes);
    }

    function vote(uint candidateIndex) public {
        require(block.timestamp < votingEndTime, "Voting period has ended.");
        require(!voters[msg.sender], "You have already voted.");

        voters[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() public view returns (string memory winnerName) {
        require(block.timestamp >= votingEndTime, "Voting period is still ongoing.");

        uint winningVoteCount = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerName = candidates[i].name;
            }
        }
    }
}
