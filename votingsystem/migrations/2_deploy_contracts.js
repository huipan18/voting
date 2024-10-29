const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    const candidates = ["Alice", "Bob", "Charlie"];
    const votingDuration = 10; // Voting duration in minutes
    deployer.deploy(Voting, candidates, votingDuration);
};
