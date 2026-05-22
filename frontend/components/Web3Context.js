import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import { TODO_ABI, CONTRACT_ADDRESS } from '../utils/contract';
import toast from 'react-hot-toast';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [networkId, setNetworkId] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not found! Please install it.');
      return;
    }
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const w3 = new Web3(window.ethereum);
      const netId = await w3.eth.net.getId();
      setWeb3(w3);
      setAccount(accounts[0]);
      setNetworkId(Number(netId));

      if (CONTRACT_ADDRESS && CONTRACT_ADDRESS !== 'YOUR_CONTRACT_ADDRESS_HERE') {
        const c = new w3.eth.Contract(TODO_ABI, CONTRACT_ADDRESS);
        setContract(c);
        toast.success('Wallet connected!');
      } else {
        toast.error('Set CONTRACT_ADDRESS in .env.local');
      }
    } catch (e) {
      toast.error(e.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = useCallback(async () => {
    if (!contract || !account) return;
    try {
      const raw = await contract.methods.getMyTasks().call({ from: account });
      const statsRaw = await contract.methods.getStats().call({ from: account });

      const formatted = raw
        .filter(t => t.content !== '')
        .map(t => ({
          id: Number(t.id),
          content: t.content,
          completed: t.completed,
          priority: Number(t.priority), 
          createdAt: Number(t.createdAt),
          completedAt: Number(t.completedAt),
        }));

      setTasks(formatted);
      setStats({
        total: Number(statsRaw.total),
        completed: Number(statsRaw.completed),
        pending: Number(statsRaw.pending),
      });
    } catch (e) {
      console.error('fetchTasks error:', e);
    }
  }, [contract, account]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = async (content, priority) => {
    if (!contract || !account) return;
    try {
      setTxLoading(true);
      const toastId = toast.loading('Adding task to blockchain...');
      await contract.methods.createTask(content, priority).send({ from: account });
      toast.dismiss(toastId);
      toast.success('Task added on-chain! ⛓️');
      await fetchTasks();
    } catch (e) {
      toast.error(e.message?.includes('revert') ? 'Transaction failed' : e.message);
    } finally {
      setTxLoading(false);
    }
  };

  const toggleTask = async (id) => {
    if (!contract || !account) return;
    try {
      setTxLoading(true);
      const toastId = toast.loading('Updating on blockchain...');
      await contract.methods.toggleTask(id).send({ from: account });
      toast.dismiss(toastId);
      toast.success('Task updated! ✅');
      await fetchTasks();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setTxLoading(false);
    }
  };

  const updateTask = async (id, newContent) => {
    if (!contract || !account) return;
    try {
      setTxLoading(true);
      const toastId = toast.loading('Saving to blockchain...');
      await contract.methods.updateTask(id, newContent).send({ from: account });
      toast.dismiss(toastId);
      toast.success('Task updated!');
      await fetchTasks();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setTxLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!contract || !account) return;
    try {
      setTxLoading(true);
      const toastId = toast.loading('Deleting from blockchain...');
      await contract.methods.deleteTask(id).send({ from: account });
      toast.dismiss(toastId);
      toast.success('Task deleted!');
      await fetchTasks();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setTxLoading(false);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on('accountsChanged', () => window.location.reload());
    window.ethereum.on('chainChanged', () => window.location.reload());
  }, []);

  return (
    <Web3Context.Provider value={{
      web3, account, contract, tasks, stats,
      loading, txLoading, networkId,
      connectWallet, createTask, toggleTask, updateTask, deleteTask, fetchTasks,
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
