import { useState } from 'react';
import { useWeb3 } from './Web3Context';

const PRIORITIES = [
  { value: 0, label: 'Low', color: 'var(--priority-low)', icon: '🟢' },
  { value: 1, label: 'Medium', color: 'var(--priority-medium)', icon: '🟡' },
  { value: 2, label: 'High', color: 'var(--priority-high)', icon: '🔴' },
];

export default function AddTaskForm() {
  const { createTask, txLoading } = useWeb3();
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || txLoading) return;
    await createTask(trimmed, priority);
    setContent('');
  };

  const remaining = 280 - content.length;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--border-color)',
        borderTop: '3px solid var(--ink)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-soft)',
        animation: 'fadeSlideIn 0.4s ease',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontWeight: '700',
          fontSize: '0.85rem',
          letterSpacing: '0.06em',
          color: 'var(--ink)',
          marginBottom: '0.4rem',
          textTransform: 'uppercase',
        }}>
          New Task
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your task here..."
            maxLength={280}
            rows={2}
            disabled={txLoading}
            style={{
              width: '100%',
              padding: '0.7rem 0.9rem',
              background: 'var(--paper-dark)',
              border: '1px solid var(--border-color)',
              borderRadius: '1px',
              color: 'var(--ink)',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              resize: 'none',
              transition: 'border-color 0.2s',
              lineHeight: '1.5',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--ink-light)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <span style={{
            position: 'absolute',
            bottom: '0.4rem',
            right: '0.6rem',
            fontSize: '0.72rem',
            color: remaining < 30 ? 'var(--accent-red)' : 'var(--ink-faint)',
            fontFamily: 'var(--font-body)',
          }}>
            {remaining}
          </span>
        </div>
      </div>

      {/* Priority + Submit */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', fontStyle: 'italic', marginRight: '0.25rem' }}>Priority:</span>
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            style={{
              padding: '0.3rem 0.75rem',
              background: priority === p.value ? 'var(--ink)' : 'var(--paper-dark)',
              border: `1px solid ${priority === p.value ? 'var(--ink)' : 'var(--border-color)'}`,
              borderRadius: '1px',
              color: priority === p.value ? 'var(--paper)' : 'var(--ink-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {p.icon} {p.label}
          </button>
        ))}

        <button
          type="submit"
          disabled={!content.trim() || txLoading}
          style={{
            marginLeft: 'auto',
            padding: '0.4rem 1.5rem',
            background: (!content.trim() || txLoading) ? 'var(--paper-darker)' : 'var(--ink)',
            border: 'none',
            borderRadius: '1px',
            color: (!content.trim() || txLoading) ? 'var(--ink-faint)' : 'var(--paper)',
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            fontSize: '0.9rem',
            letterSpacing: '0.04em',
            cursor: (!content.trim() || txLoading) ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {txLoading ? '⟳  Saving...' : '+ Add to Chain'}
        </button>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', fontStyle: 'italic', marginTop: '0.5rem' }}>
        Press Enter to submit · Each task costs a small gas fee
      </p>
    </form>
  );
}
