import { useState } from 'react';
import { useWeb3 } from './Web3Context';

const PRIORITY_CONFIG = {
  0: { label: 'Low',    color: 'var(--priority-low)',    icon: '🟢', bar: '#2d6a4f' },
  1: { label: 'Medium', color: 'var(--priority-medium)', icon: '🟡', bar: '#d4870a' },
  2: { label: 'High',   color: 'var(--priority-high)',   icon: '🔴', bar: '#c0392b' },
};

function formatDate(ts) {
  if (!ts) return '';
  return new Date(ts * 1000).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export default function TaskItem({ task, delay, disabled }) {
  const { toggleTask, updateTask, deleteTask } = useWeb3();
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);
  const [hovering, setHovering] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG[0];

  const handleSave = async () => {
    if (editContent.trim() && editContent.trim() !== task.content) {
      await updateTask(task.id, editContent.trim());
    }
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    await deleteTask(task.id);
    setConfirmDelete(false);
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setConfirmDelete(false); }}
      style={{
        background: task.completed ? 'var(--paper-dark)' : 'var(--paper)',
        border: '1px solid var(--border-color)',
        borderLeft: `3px solid ${task.completed ? 'var(--ink-faint)' : pri.bar}`,
        padding: '0.85rem 1rem',
        opacity: task.completed ? 0.65 : 1,
        transition: 'all 0.2s',
        boxShadow: hovering && !task.completed ? 'var(--shadow-soft)' : 'none',
        animation: `fadeSlideIn 0.35s ease both`,
        animationDelay: `${delay}s`,
        position: 'relative',
      }}
    >
      {/* Confirm delete banner */}
      {confirmDelete && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(192, 57, 43, 0.06)',
          border: '1px solid rgba(192, 57, 43, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          zIndex: 2,
          backdropFilter: 'blur(2px)',
        }}>
          <span style={{ fontStyle: 'italic', color: 'var(--accent-red)', fontSize: '0.9rem' }}>
            Delete from blockchain?
          </span>
          <button onClick={handleDelete} style={confirmBtnStyle('#c0392b', 'var(--paper)')}>Yes, delete</button>
          <button onClick={() => setConfirmDelete(false)} style={confirmBtnStyle('var(--ink-muted)', 'var(--paper-dark)')}>Cancel</button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        {/* Checkbox */}
        <button
          onClick={() => !disabled && toggleTask(task.id)}
          disabled={disabled}
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
          style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            marginTop: '2px',
            border: `1.5px solid ${task.completed ? 'var(--accent-green)' : 'var(--ink-muted)'}`,
            borderRadius: '1px',
            background: task.completed ? 'var(--accent-green)' : 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            color: 'var(--paper)',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          {task.completed ? '✓' : ''}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <div>
              <input
                autoFocus
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') { setEditing(false); setEditContent(task.content); }
                }}
                maxLength={280}
                style={{
                  width: '100%',
                  padding: '0.3rem 0.5rem',
                  background: 'var(--paper-dark)',
                  border: '1px solid var(--ink-light)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  borderRadius: '1px',
                }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                <button onClick={handleSave} style={smallBtn('var(--ink)', 'var(--paper)')}>Save</button>
                <button onClick={() => { setEditing(false); setEditContent(task.content); }} style={smallBtn('transparent', 'var(--ink-muted)')}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--ink)',
                lineHeight: '1.4',
                position: 'relative',
                display: 'inline',
                textDecoration: task.completed ? 'line-through' : 'none',
                textDecorationColor: 'var(--ink-muted)',
              }}>
                {task.content}
              </p>
            </div>
          )}

          {/* Meta row */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '0.4rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <span style={{
              fontSize: '0.72rem',
              color: task.completed ? 'var(--ink-faint)' : pri.color,
              fontStyle: 'italic',
            }}>
              {pri.icon} {pri.label}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', fontStyle: 'italic' }}>
              ⛓️ #{task.id}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>
              {formatDate(task.createdAt)}
            </span>
            {task.completed && task.completedAt > 0 && (
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-green)' }}>
                ✅ {formatDate(task.completedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Actions (visible on hover) */}
        {!editing && (
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            opacity: hovering ? 1 : 0,
            transition: 'opacity 0.2s',
            flexShrink: 0,
          }}>
            {!task.completed && (
              <ActionBtn
                onClick={() => { setEditing(true); setEditContent(task.content); }}
                title="Edit"
                disabled={disabled}
              >
                ✏️
              </ActionBtn>
            )}
            <ActionBtn onClick={handleDelete} title="Delete" disabled={disabled}>
              🗑️
            </ActionBtn>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBtn({ onClick, title, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        padding: '0.25rem 0.4rem',
        background: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '1px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.85rem',
        transition: 'background 0.15s',
        color: 'var(--ink-muted)',
      }}
      onMouseEnter={e => e.target.style.background = 'var(--paper-dark)'}
      onMouseLeave={e => e.target.style.background = 'transparent'}
    >
      {children}
    </button>
  );
}

const smallBtn = (bg, color) => ({
  padding: '0.2rem 0.65rem',
  background: bg,
  border: `1px solid ${bg === 'transparent' ? 'var(--border-color)' : bg}`,
  borderRadius: '1px',
  color,
  fontFamily: 'var(--font-body)',
  fontSize: '0.82rem',
  cursor: 'pointer',
});

const confirmBtnStyle = (bg, color) => ({
  padding: '0.25rem 0.75rem',
  background: bg,
  border: 'none',
  borderRadius: '1px',
  color,
  fontFamily: 'var(--font-body)',
  fontWeight: '600',
  fontSize: '0.82rem',
  cursor: 'pointer',
});
