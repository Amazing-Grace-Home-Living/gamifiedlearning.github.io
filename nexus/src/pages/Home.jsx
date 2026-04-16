import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMinistryProgress } from '../state/useMinistryProgress.js';
import { useXP } from '../state/useXP.js';
import LedgerCard from '../components/blackwood/LedgerCard.jsx';
import QuestProgress from '../components/ui/QuestProgress.jsx';
import QUEST_DATA from '../components/blackwood/questData.js';
import { QUEST_ORDER } from '../state/questEngine.js';

export default function Home() {
  const navigate = useNavigate();
  const { isUnlocked, isComplete, active, completedCount, totalQuests, ministry } = useMinistryProgress();
  const { xp, level, xpIntoLevel, xpPerLevel } = useXP();

  const questList = QUEST_DATA.map((q) => ({ id: q.id, label: q.label }));

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/nexus/assets/blackwood/wisdom-star.png" alt="Nexus" style={{ width: 56, height: 56, margin: '0 auto 0.75rem' }} />
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
          Nexus
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Mystery of the Seven Stars</p>
      </header>

      {/* Ministry + XP */}
      <div className="card shadow-card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <div className="card-header">Ministry Rank</div>
            <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1rem' }}>{ministry.title}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="card-header">Level {level}</div>
            <div style={{ color: 'var(--color-text)', fontWeight: 600 }}>{xp} XP</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(xpIntoLevel / xpPerLevel) * 100}%` }} />
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>
          {xpIntoLevel} / {xpPerLevel} to next level
        </div>
      </div>

      {/* Quest progress stepper */}
      <div style={{ marginBottom: '1.5rem' }}>
        <QuestProgress quests={questList} completedIds={QUEST_ORDER.filter((id) => isComplete(id))} activeId={active} />
      </div>

      {/* Quest list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {QUEST_DATA.map((q) => (
          <LedgerCard
            key={q.id}
            quest={q}
            isComplete={isComplete(q.id)}
            isActive={active === q.id}
            isLocked={!isUnlocked(q.id)}
            onClick={() => navigate(`/quest/${q.id}`)}
          />
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/stars')} style={{ fontSize: '0.8rem' }}>
          ✦ View Star Gallery ({completedCount}/{totalQuests})
        </button>
      </div>
    </div>
  );
}
