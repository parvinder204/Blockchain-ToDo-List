import { useWeb3 } from './Web3Context';

export default function ConnectPage() {
  const { connectWallet, loading } = useWeb3();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: 'var(--paper)',
        border: '1px solid var(--border-color)',
        borderRadius: '2px',
        padding: '3.5rem 3rem',
        maxWidth: '460px',
        width: '100%',
        textAlign: 'center',
        boxShadow: 'var(--shadow-card)',
        animation: 'inkDrop 0.5s ease',
        position: 'relative',
      }}>
        {/* Corner fold effect */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 32px 32px 0',
          borderColor: `transparent var(--paper-darker) transparent transparent`,
        }} />
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 31px 31px 0',
          borderColor: `transparent var(--paper) transparent transparent`,
        }} />

        {/* Header rule */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.6rem',
            fontWeight: '900',
            color: 'var(--ink)',
            lineHeight: '1.1',
            marginBottom: '0.4rem',
          }}>
            Chain<span style={{ color: 'var(--accent-red)' }}>Tasks</span>
          </div>
          <div style={{
            width: '40px',
            height: '2px',
            background: 'var(--accent-red)',
            margin: '0.75rem auto',
          }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--ink-muted)',
            fontStyle: 'italic',
          }}>
            Your to-do list, permanently written on the blockchain
          </p>
        </div>

        {/* Features */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
          padding: '1.5rem',
          background: 'var(--paper-dark)',
          borderLeft: '3px solid var(--accent-red)',
        }}>
          {[
            ['⛓️', 'Every task stored on Ethereum blockchain'],
            ['🔒', 'Only you can see and edit your tasks'],
            ['✏️', 'Create, complete, edit, delete tasks'],
            ['🎯', 'Set priority: Low, Medium, or High'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display: 'flex',
              gap: '0.75rem',
              fontSize: '0.95rem',
              color: 'var(--ink-light)',
              alignItems: 'flex-start',
            }}>
              <span style={{ flexShrink: 0 }}>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={connectWallet}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: loading ? 'var(--paper-darker)' : 'var(--ink)',
            border: 'none',
            borderRadius: '1px',
            color: loading ? 'var(--ink-muted)' : 'var(--paper)',
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            fontSize: '1rem',
            letterSpacing: '0.04em',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? '⟳  Connecting...' : '🦊  Connect MetaMask'}
        </button>

        <p style={{
          marginTop: '1rem',
          fontSize: '0.82rem',
          color: 'var(--ink-faint)',
          fontStyle: 'italic',
        }}>
          Requires MetaMask + Ganache running on localhost:7545
        </p>
      </div>
    </div>
  );
}
