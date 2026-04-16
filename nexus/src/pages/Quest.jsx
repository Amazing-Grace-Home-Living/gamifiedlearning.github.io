import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMinistryProgress } from '../state/useMinistryProgress.js';
import { useBadges } from '../state/useBadges.js';
import QUEST_DATA from '../components/blackwood/questData.js';
import { QUEST_IDS } from '../state/questEngine.js';

import ClueInput from '../components/blackwood/ClueInput.jsx';
import WhisperingPines from '../components/blackwood/WhisperingPines.jsx';
import RavensMessage from '../components/blackwood/RavensMessage.jsx';
import ThirdStarAltar from '../components/blackwood/ThirdStarAltar.jsx';
import LibraryOfStillWaters from '../components/blackwood/LibraryOfStillWaters.jsx';
import RewardBadge from '../components/ui/RewardBadge.jsx';

const BADGE_MAP = {
  [QUEST_IDS.BLACKWOOD_LEDGER]:     'first-seal',
  [QUEST_IDS.WHISPERING_PINES]:     'pathfinder',
  [QUEST_IDS.RAVENS_MESSAGE]:       'raven-speaker',
  [QUEST_IDS.THIRD_STAR_ALTAR]:     'star-walker',
  [QUEST_IDS.LIBRARY_STILL_WATERS]: 'keeper',
};

/**
 * BlackwoodLedger sub-view — clue-based quest for Quest 1.
 */
function BlackwoodLedger({ questData, onComplete, isComplete }) {
  const clues = questData?.clues ?? [];
  const [solvedClues, setSolvedClues] = React.useState([]);
  const allSolved = clues.length > 0 && solvedClues.length === clues.length;

  const handleCorrect = (clueId) => {
    setSolvedClues((prev) => {
      if (prev.includes(clueId)) return prev;
      const next = [...prev, clueId];
      if (next.length === clues.length && !isComplete) onComplete?.();
      return next;
    });
  };

  return (
    <div className="transition-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <img src="/nexus/assets/blackwood/artifact-ledger-seal.png" alt="Ledger" style={{ width: 80, height: 80, borderRadius: '12px', border: '1px solid var(--color-border)' }} />
        <div>
          <div className="card-header">{questData?.subtitle}</div>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{questData?.label}</h2>
        </div>
      </div>
      <p className="lore-text" style={{ marginBottom: '1.5rem' }}>{questData?.lore}</p>
      {isComplete ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-success)' }}>✦ Ledger opened. First seal broken.</div>
      ) : (
        clues.map((clue) => (
          <ClueInput
            key={clue.id}
            clue={clue}
            onCorrect={() => handleCorrect(clue.id)}
            disabled={solvedClues.includes(clue.id) || isComplete}
          />
        ))
      )}
      {allSolved && !isComplete && (
        <div style={{ marginTop: '1rem', color: 'var(--color-success)', textAlign: 'center', fontWeight: 600 }}>✦ Clues solved! Quest complete.</div>
      )}
    </div>
  );
}

export default function Quest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isComplete, isUnlocked, advance } = useMinistryProgress();
  const { awardBadge, badgeDefs } = useBadges();

  const questData = QUEST_DATA.find((q) => q.id === id);

  if (!questData || !isUnlocked(id)) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Quest not found or not yet unlocked.</p>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>← Back to Ledger</button>
      </div>
    );
  }

  const complete = isComplete(id);

  const handleComplete = () => {
    advance(id);
    const badgeId = BADGE_MAP[id];
    if (badgeId) awardBadge(badgeId);
  };

  const badge = Object.values(badgeDefs).find((b) => b.id === BADGE_MAP[id]);

  const renderQuestContent = () => {
    switch (id) {
      case QUEST_IDS.BLACKWOOD_LEDGER:
        return <BlackwoodLedger questData={questData} onComplete={handleComplete} isComplete={complete} />;
      case QUEST_IDS.WHISPERING_PINES:
        return <WhisperingPines questData={questData} onComplete={handleComplete} isComplete={complete} />;
      case QUEST_IDS.RAVENS_MESSAGE:
        return <RavensMessage questData={questData} onComplete={handleComplete} isComplete={complete} />;
      case QUEST_IDS.THIRD_STAR_ALTAR:
        return <ThirdStarAltar questData={questData} onComplete={handleComplete} isComplete={complete} />;
      case QUEST_IDS.LIBRARY_STILL_WATERS:
        return <LibraryOfStillWaters questData={questData} onComplete={handleComplete} isComplete={complete} />;
      default:
        return <p>Unknown quest.</p>;
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>
      <button
        className="btn btn-ghost"
        onClick={() => navigate('/')}
        style={{ marginBottom: '1.25rem', fontSize: '0.8rem', padding: '4px 12px' }}
      >
        ← Back to Ledger
      </button>

      <div className="card shadow-card">
        {renderQuestContent()}
      </div>

      {badge && (
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <RewardBadge badge={badge} earned={complete} />
        </div>
      )}
    </div>
  );
}
