import { useWeb3 } from './Web3Context';

export default function StatsBar() {
  const { stats } = useWeb3();
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.75rem',
      marginBottom: '1.75rem',
    }}>
      <StatCard label="Total Tasks" value={stats.total} color="var(--ink)" icon="📋" />
      <StatCard label="Completed" value={stats.completed} color="var(--accent-green)" icon="✅" />
      <StatCard label="Pending" value={stats.pending} color="var(--accent-amber)" icon="⏳" />

      {/* Progress */}
      {stats.total > 0 && (
        <div style={{
          gridColumn: '1 / -1',
          padding: '0.75rem 1rem',
          background: 'var(--paper-dark)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
              Progress
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: pct === 100 ? 'var(--accent-green)' : 'var(--ink)',
            }}>
              {pct}% {pct === 100 ? '🎉' : ''}
            </span>
          </div>
          <div style={{ height: '4px', background: 'var(--paper-darker)', borderRadius: '2px' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: pct === 100 ? 'var(--accent-green)' : 'var(--accent-amber)',
              borderRadius: '2px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      padding: '1rem',
      background: 'var(--paper-dark)',
      border: '1px solid var(--border-color)',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.8rem',
        fontWeight: '900',
        color,
        lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--ink-muted)',
        fontStyle: 'italic',
        marginTop: '0.2rem',
      }}>
        {label}
      </div>
    </div>
  );
}
