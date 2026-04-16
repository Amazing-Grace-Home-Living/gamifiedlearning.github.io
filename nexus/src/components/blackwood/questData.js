import { QUEST_IDS } from '../../state/questEngine.js';

export const QUEST_DATA = [
  {
    id: QUEST_IDS.BLACKWOOD_LEDGER,
    label: 'Blackwood Ledger',
    subtitle: 'Quest I',
    icon: '/nexus/assets/icons/blackwood.png',
    artifact: '/nexus/assets/blackwood/artifact-ledger-seal.png',
    lore: 'Deep in the Blackwood archive lies a sealed ledger. Its pages hold the first clue to the Seven Stars.',
    clues: [
      {
        id: 'clue-1',
        prompt: 'What ancient order sealed the Blackwood Ledger?',
        answer: 'star keepers',
        hints: ['They guard celestial knowledge.', 'Their title contains "star".'],
      },
      {
        id: 'clue-2',
        prompt: 'Name the symbol etched upon the ledger\'s cover.',
        answer: 'triangle',
        hints: ['It has three sides.', 'Look at the symbols in the archive.'],
      },
    ],
  },
  {
    id: QUEST_IDS.WHISPERING_PINES,
    label: 'Whispering Pines',
    subtitle: 'Quest II',
    icon: '/nexus/assets/icons/pines.png',
    artifact: '/nexus/assets/blackwood/artifact-pines-echo.png',
    lore: 'The pines speak only to those who listen with patience. Find the hidden echo within the grove.',
    clues: [
      {
        id: 'clue-3',
        prompt: 'How many stones mark the outer ring of the grove?',
        answer: 'seven',
        hints: ['Count the standing markers.', 'The number relates to the stars.'],
      },
    ],
  },
  {
    id: QUEST_IDS.RAVENS_MESSAGE,
    label: "Raven's Message",
    subtitle: 'Quest III',
    icon: '/nexus/assets/icons/ravens.png',
    artifact: '/nexus/assets/blackwood/artifact-raven-emblem.png',
    lore: 'The ravens carry fragments of an ancient message. Match their tiles to reveal the hidden word.',
    targetScore: 300,
  },
  {
    id: QUEST_IDS.THIRD_STAR_ALTAR,
    label: 'Third Star Altar',
    subtitle: 'Quest IV',
    icon: '/nexus/assets/icons/altar.png',
    artifact: '/nexus/assets/blackwood/third-star-altar.png',
    lore: 'Three symbols must be entered in the correct sequence to awaken the Third Star Altar.',
    sequence: ['triangle', 'circle', 'diamond'],
    symbols: [
      { id: 'triangle', label: '▲', img: '/nexus/assets/blackwood/symbol-triangle.png' },
      { id: 'circle',   label: '●', img: '/nexus/assets/blackwood/symbol-circle.png'   },
      { id: 'diamond',  label: '◆', img: '/nexus/assets/blackwood/symbol-diamond.png'  },
    ],
  },
  {
    id: QUEST_IDS.LIBRARY_STILL_WATERS,
    label: 'Library of Still Waters',
    subtitle: 'Wisdom Star',
    icon: '/nexus/assets/icons/wisdom.png',
    artifact: '/nexus/assets/blackwood/library-still-waters.png',
    lore: 'The Library of Still Waters holds the final truth. Answer all three questions drawn from the scrolls.',
    clues: [
      {
        id: 'wisdom-1',
        prompt: 'What virtue does still water embody?',
        answer: 'patience',
        hints: ['It does not rush.', 'The opposite of haste.'],
      },
      {
        id: 'wisdom-2',
        prompt: 'In how many days was the Seven Stars map completed?',
        answer: 'forty',
        hints: ['A number of significance across many traditions.', 'Between thirty and fifty.'],
      },
      {
        id: 'wisdom-3',
        prompt: 'Name the final star of the Ministry.',
        answer: 'wisdom',
        hints: ['It is the name of this library.', 'The opposite of folly.'],
      },
    ],
  },
];

export default QUEST_DATA;
