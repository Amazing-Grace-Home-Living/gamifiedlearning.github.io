import React from 'react';

/**
 * QuestProgress — horizontal stepper showing quest completion state.
 */
export default function QuestProgress({ quests, completedIds, activeId }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'auto', padding: '0.25rem 0' }}>
      {quests.map((quest, i) => {
        const isDone   = completedIds.includes(quest.id);
        const isActive = activeId === quest.id;

        const color = isDone ? 'var(--color-primary)'
          : isActive ? 'var(--color-accent)'
          : 'var(--color-border)';

        return (
          <React.Fragment key={quest.id}>
            <div
              title={quest.label}
              style={{
                width: 28, height: 28,
                borderRadius: '50%',
                border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: isDone || isActive ? color : 'var(--color-text-muted)',
                background: isDone ? 'rgba(200,168,75,0.1)' : isActive ? 'rgba(123,94,167,0.1)' : 'transparent',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            >
              {isDone ? '✓' : i + 1}
            </div>
            {i < quests.length - 1 && (
              <div style={{
                flex: 1,
                height: 2,
                minWidth: 12,
                background: isDone ? 'var(--color-primary)' : 'var(--color-border)',
                transition: 'background 0.4s ease',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
