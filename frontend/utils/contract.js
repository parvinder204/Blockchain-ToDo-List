export const TODO_ABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_content", "type": "string" }, { "internalType": "uint8", "name": "_priority", "type": "uint8" }],
    "name": "createTask", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
    "name": "toggleTask", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "string", "name": "_newContent", "type": "string" }],
    "name": "updateTask", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
    "name": "deleteTask", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyTasks",
    "outputs": [{
      "components": [
        { "internalType": "uint256", "name": "id", "type": "uint256" },
        { "internalType": "string", "name": "content", "type": "string" },
        { "internalType": "bool", "name": "completed", "type": "bool" },
        { "internalType": "uint8", "name": "priority", "type": "uint8" },
        { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
        { "internalType": "uint256", "name": "completedAt", "type": "uint256" }
      ],
      "internalType": "struct TodoList.Task[]", "name": "", "type": "tuple[]"
    }],
    "stateMutability": "view", "type": "function"
  },
  {
    "inputs": [],
    "name": "getStats",
    "outputs": [
      { "internalType": "uint256", "name": "total", "type": "uint256" },
      { "internalType": "uint256", "name": "completed", "type": "uint256" },
      { "internalType": "uint256", "name": "pending", "type": "uint256" }
    ],
    "stateMutability": "view", "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "taskCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "content", "type": "string" },
      { "indexed": false, "internalType": "uint8", "name": "priority", "type": "uint8" }
    ],
    "name": "TaskCreated", "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }
    ],
    "name": "TaskCompleted", "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }
    ],
    "name": "TaskDeleted", "type": "event"
  }
];

// Paste your deployed contract address here (from: truffle migrate output)
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "YOUR_CONTRACT_ADDRESS_HERE";
