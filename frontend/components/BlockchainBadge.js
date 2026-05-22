import { useWeb3 } from './Web3Context';
import { CONTRACT_ADDRESS } from '../utils/contract';

export default function BlockchainBadge() {
  const { networkId } = useWeb3();
  const short = CONTRACT_ADDRESS !== 'YOUR_CONTRACT_ADDRESS_HERE'
    ? `${CONTRACT_ADDRESS.slice(0, 10)}…${CONTRACT_ADDRESS.slice(-8)}`
    : 'Not configured';

  return (
    <div style={{
      marginTop: '3rem',
      padding: '1rem 1.25rem',
      background: 'var(--paper-dark)',
      border: '1px solid var(--border-color)',
      borderTop: '2px solid var(--ink)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <MetaItem label="Contract" value={short} />
        <MetaItem label="Network" value={networkId === 1337 || networkId === 5777 ? 'Ganache (Local)' : `Chain ${networkId}`} />
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--ink-faint)',
        fontStyle: 'italic',
        alignSelf: 'center',
      }}>
        ⛓️ All tasks stored on Ethereum
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.65rem', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', fontFamily: 'monospace', marginTop: '0.1rem' }}>
        {value}
      </div>
    </div>
  );
}
