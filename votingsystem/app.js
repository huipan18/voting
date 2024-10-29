const contractAddress = '0xE673Dfe9EF62DaBeB35d63dc8207fb106FB4a97F';
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "candidateNames",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "durationMinutes",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEndTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinner",
      "outputs": [
        {
          "internalType": "string",
          "name": "winnerName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] // Paste the ABI from the build folder

let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
let contract = new web3.eth.Contract(contractABI, contractAddress);

async function loadCandidates() {
    let candidates = await contract.methods.getCandidates().call();
    let candidatesDiv = document.getElementById("candidates");
    candidates.forEach((candidate, index) => {
        let candidateElement = document.createElement("p");
        candidateElement.innerText = `${index}: ${candidate.name} (${candidate.voteCount} votes)`;
        candidatesDiv.appendChild(candidateElement);
    });
}

async function vote() {
    let candidateIndex = document.getElementById("candidateIndex").value;
    let accounts = await web3.eth.getAccounts();
    await contract.methods.vote(candidateIndex).send({ from: accounts[0] });
    loadCandidates();
    checkWinner();
}

async function checkWinner() {
    try {
        let winner = await contract.methods.getWinner().call();
        document.getElementById("winner").innerText = `Current Winner: ${winner}`;
    } catch (error) {
        document.getElementById("winner").innerText = "Voting is still ongoing or no votes have been cast.";
    }
}

window.onload = loadCandidates;
