# 📋 ChainTasks — Blockchain To-Do List

A beginner-friendly decentralized to-do app where **every task is stored permanently on the Ethereum blockchain** using Solidity, Web3.js, and Next.js.


## ✅ What You Need (Prerequisites)

| Tool | Where to get it |
|------|----------------|
| Node.js 18+ | https://nodejs.org |
| Ganache GUI | https://trufflesuite.com/ganache |
| MetaMask | Chrome Web Store |
| Truffle | `npm install -g truffle` |

---

## 🚀 Setup — Step by Step

---

### STEP 1 — Install Truffle (one time)

```bash
npm install -g truffle
```

Check it works:
```bash
truffle version
```

---

### STEP 2 — Start Ganache

1. Open **Ganache** desktop app
2. Click **"Quickstart"** → Ethereum
3. You'll see 10 accounts, each with 100 ETH
4. RPC Server: `HTTP://127.0.0.1:7545`  ← keep this running!

---

### STEP 3 — Add Ganache to MetaMask

1. Open **MetaMask** in Chrome → click network dropdown → **Add network manually**
2. Fill in:
   ```
   Network Name : Ganache
   RPC URL      : http://127.0.0.1:7545
   Chain ID     : 1337
   Symbol       : ETH
   ```
3. Click **Save**, then switch to Ganache network

**Import a Ganache account:**
1. In Ganache, click the 🔑 key icon next to Account #1
2. Copy the Private Key
3. MetaMask → click avatar → **Import Account** → paste private key

---

### STEP 4 — Deploy the Smart Contract

Open a terminal in the `blockchain-todo/` folder:

```bash
# Install dependencies
npm install

# Compile the Solidity contract
truffle compile

# Deploy to Ganache
truffle migrate --network development
```

You'll see output like:
```
✅ TodoList contract deployed at: 0xAbCd1234...
📋 Paste this address into frontend/.env.local
```

**Copy that address!** You need it in the next step.

---

### STEP 5 — Set the Contract Address

```bash
cd frontend
cp .env.example .env.local
```

Open `.env.local` and paste your address:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
```

---

### STEP 6 — Install Frontend Dependencies

Still inside the `frontend/` folder:

```bash
npm install
```

---

### STEP 7 — Run the App

```bash
npm run dev
```

Open **http://localhost:3000** in Chrome 🎉

---

## 🎮 How to Use

1. **Connect MetaMask** → click the button on the landing page
2. **Add a task** → type in the box, choose priority (Low/Medium/High), press Enter or click "+ Add to Chain"
3. MetaMask popup appears → click **Confirm** → task is written to blockchain
4. **Complete a task** → click the checkbox on the left
5. **Edit a task** → hover over it → click ✏️ → edit → press Enter
6. **Delete a task** → hover → click 🗑️ → confirm
7. **Filter tasks** → use All / Pending / Completed buttons
8. **Sort tasks** → use the sort dropdown (newest, oldest, priority)

---

## 💡 Smart Contract Features

| Function | Description |
|----------|-------------|
| `createTask(content, priority)` | Add a new task |
| `toggleTask(id)` | Mark complete or incomplete |
| `updateTask(id, newContent)` | Edit task text |
| `deleteTask(id)` | Remove a task |
| `getMyTasks()` | Get all your tasks |
| `getStats()` | Get total / completed / pending counts |

**Each wallet address has its own private task list** — other users cannot see or edit your tasks.

---

## 🔄 Reset / Redeploy

If you want to start fresh:

```bash
# From blockchain-todo/ root:
truffle migrate --reset --network development
```

Then update the address in `frontend/.env.local`.

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| MetaMask not found | Install MetaMask Chrome extension |
| Wrong network error | Switch MetaMask to Ganache (Chain ID 1337) |
| "Contract address not set" | Add address to `frontend/.env.local` |
| Transaction keeps failing | Make sure Ganache is running on port 7545 |
| Tasks not loading | Refresh page after connecting wallet |
| "Cannot edit completed task" | You can only edit tasks that are not yet done |

---

## ⛓️ How it Works (Beginner Explanation)

1. **Smart Contract** = a program running on the blockchain. It stores your tasks in a `mapping(address => Task[])` — meaning each wallet has its own task list.
2. **Truffle** = a tool that compiles your Solidity code and deploys it to Ganache (your local Ethereum network).
3. **Ganache** = a fake Ethereum blockchain running on your computer. Free transactions!
4. **Web3.js** = a JavaScript library that lets the website talk to the smart contract.
5. **MetaMask** = your wallet. It signs every transaction (create/edit/delete/complete) so the blockchain knows it's really you.
