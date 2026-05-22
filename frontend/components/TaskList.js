import { useState } from 'react';
import { useWeb3 } from './Web3Context';
import TaskItem from './TaskItem';

const FILTERS = ['All', 'Pending', 'Completed'];

export default function TaskList() {
  const { tasks, txLoading } = useWeb3();
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filtered = tasks.filter(t => {
    if (filter === 'Pending') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt - a.createdAt;
    if (sortBy === 'oldest') return a.createdAt - b.createdAt;
    if (sortBy === 'priority') return b.priority - a.priority;
    return 0;
  });

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.3rem 0.85rem',
                background: filter === f ? 'var(--ink)' : 'transparent',
                border: `1px solid ${filter === f ? 'var(--ink)' : 'var(--border-color)'}`,
                borderRadius: '1px',
                color: filter === f ? 'var(--paper)' : 'var(--ink-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            padding: '0.3rem 0.6rem',
            background: 'var(--paper-dark)',
            border: '1px solid var(--border-color)',
            borderRadius: '1px',
            color: 'var(--ink-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            cursor: 'pointer',
          }}
        >
          <option value="newest">↓ Newest first</option>
          <option value="oldest">↑ Oldest first</option>
          <option value="priority">★ By priority</option>
        </select>
      </div>

      {/* Task count */}
      <div style={{
        fontSize: '0.8rem',
        color: 'var(--ink-faint)',
        fontStyle: 'italic',
        marginBottom: '0.75rem',
        paddingLeft: '0.1rem',
      }}>
        Showing {sorted.length} {filter.toLowerCase()} task{sorted.length !== 1 ? 's' : ''}
      </div>

      {/* Empty state */}
      {sorted.length === 0 && (
        <div style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: 'var(--paper-dark)',
          border: '1px dashed var(--ink-faint)',
          animation: 'fadeSlideIn 0.4s ease',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            {filter === 'Completed' ? '🎉' : '📝'}
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--ink-muted)',
            fontStyle: 'italic',
          }}>
            {filter === 'Completed'
              ? 'No completed tasks yet'
              : filter === 'Pending'
              ? 'No pending tasks — all done!'
              : 'No tasks yet. Add your first task above.'}
          </p>
        </div>
      )}

      {/* Tasks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sorted.map((task, idx) => (
          <TaskItem key={task.id} task={task} delay={idx * 0.04} disabled={txLoading} />
        ))}
      </div>
    </div>
  );
}
