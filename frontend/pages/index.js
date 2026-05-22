import Head from 'next/head';
import { useWeb3 } from '../components/Web3Context';
import ConnectPage from '../components/ConnectPage';
import Header from '../components/Header';
import StatsBar from '../components/StatsBar';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import BlockchainBadge from '../components/BlockchainBadge';

export default function Home() {
  const { account } = useWeb3();

  return (
    <>
      <Head>
        <title>ChainTasks — Blockchain To-Do List</title>
        <meta name="description" content="Your tasks, forever on-chain" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>" />
      </Head>

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {!account ? (
          <ConnectPage />
        ) : (
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
            <Header />
            <StatsBar />
            <AddTaskForm />
            <TaskList />
            <BlockchainBadge />
          </div>
        )}
      </div>
    </>
  );
}
