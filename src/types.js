export const CARD_TYPES = {
  ATTACK: 'attack',
  TARGETED_ATTACK: 'targeted_attack',
  SKIP: 'skip',
  DEFUSE: 'defuse',
  SHUFFLE: 'shuffle',
  SEE_FUTURE: 'see_future',
  ALTER_FUTURE: 'alter_future',
  FAVOR: 'favor',
  NOPE: 'nope',
  BINGUS: 'bingus',
  LARRY: 'larry',
  JAMES: 'james',
  RONALD: 'ronald',
  KARMOR: 'karmor',
  EXPLODING_KITTEN: 'exploding_kitten'
};

export const CARD_CONFIG = {
  [CARD_TYPES.ATTACK]: { label: 'Attack', color: 'bg-accent shadow-glow-accent', icon: 'Zap' },
  [CARD_TYPES.TARGETED_ATTACK]: { label: 'Targeted Attack', color: 'bg-red-800 shadow-glow-accent', icon: 'Crosshair' },
  [CARD_TYPES.SKIP]: { label: 'Skip', color: 'bg-info shadow-glow-info', icon: 'SkipForward' },
  [CARD_TYPES.DEFUSE]: { label: 'Defuse', color: 'bg-success shadow-glow-success', icon: 'ShieldCheck' },
  [CARD_TYPES.SHUFFLE]: { label: 'Shuffle', color: 'bg-purple-600 shadow-glow-purple', icon: 'RefreshCw' },
  [CARD_TYPES.SEE_FUTURE]: { label: 'See Future', color: 'bg-cyan-400 shadow-glow-info', icon: 'Eye' },
  [CARD_TYPES.ALTER_FUTURE]: { label: 'Alter Future', color: 'bg-indigo-600 shadow-glow-indigo', icon: 'Settings2' },
  [CARD_TYPES.FAVOR]: { label: 'Favor', color: 'bg-warning shadow-glow-warning', icon: 'Gift' },
  [CARD_TYPES.NOPE]: { label: 'Nope', color: 'bg-orange-500 shadow-glow-orange', icon: 'XCircle' },
  [CARD_TYPES.BINGUS]: { label: 'Bingus', color: 'bg-zinc-800', icon: 'PawPrint' },
  [CARD_TYPES.LARRY]: { label: 'Larry', color: 'bg-zinc-800', icon: 'PawPrint' },
  [CARD_TYPES.JAMES]: { label: 'James', color: 'bg-zinc-800', icon: 'PawPrint' },
  [CARD_TYPES.RONALD]: { label: 'Ronald', color: 'bg-zinc-800', icon: 'PawPrint' },
  [CARD_TYPES.KARMOR]: { label: 'Karmor', color: 'bg-zinc-800', icon: 'PawPrint' },
  [CARD_TYPES.EXPLODING_KITTEN]: { label: 'Boom!', color: 'bg-accent shadow-[0_0_40px_rgba(255,0,51,0.6)] animate-pulse', icon: 'Bomb' }
};
