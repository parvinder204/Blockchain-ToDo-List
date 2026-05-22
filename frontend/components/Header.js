import { useWeb3 } from './Web3Context';

export default function Header() {
  const { account, networkId } = useWeb3();
  const short = account ? `${account.slice(0, 6)}…${account.slice(-4)}` : '';

  const netName = (id) => {
    const m = { 1337: 'Ganache', 5777: 'Ganache', 1: 'Mainnet' };
    return m[id] || `Chain ${id}`;
  };

  return (
    <header style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid var(--ink)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: '900',
            color: 'var(--ink)',
            lineHeight: '1',
            letterSpacing: '-0.01em',
          }}>
            Chain<span style={{ color: 'var(--accent-red)' }}>Tasks</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            color: 'var(--ink-muted)',
            fontSize: '1rem',
            marginTop: '0.2rem',
          }}>
            Tasks written in ink that cannot be erased
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
          <div style={{
            padding: '0.3rem 0.75rem',
            background: 'var(--paper-dark)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--ink-light)',
            fontFamily: 'var(--font-body)',
          }}>
            🦊 {short}
          </div>
          {networkId && (
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--accent-green)',
              fontFamily: 'var(--font-body)',
            }}>
              ● {netName(networkId)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
