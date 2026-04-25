import { motion } from 'framer-motion';
import { CARD_CONFIG } from '../types';
import * as Icons from 'lucide-react';
import { clsx } from 'clsx';

export const Card = ({ card, isSelected, onClick, disabled, className, isFlipped = true }) => {
  const config = CARD_CONFIG[card.type] || { label: 'Unknown', color: 'bg-muted', icon: 'HelpCircle' };
  const Icon = Icons[config.icon] || Icons.HelpCircle;

  // Map our dynamic colors from the store/types to CSS classes or variables
  const getCardColor = () => {
    switch (card.type) {
      case 'attack': return 'var(--accent)';
      case 'targeted_attack': return '#80001a';
      case 'skip': return 'var(--info)';
      case 'defuse': return 'var(--success)';
      case 'shuffle': return 'var(--purple)';
      case 'see_future': return '#22d3ee';
      case 'alter_future': return '#4f46e5';
      case 'favor': return 'var(--warning)';
      case 'nope': return '#f97316';
      case 'exploding_kitten': return 'var(--accent)';
      default: return 'var(--muted)';
    }
  };

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        y: isSelected ? -20 : 0,
        scale: isSelected ? 1.05 : 1,
        rotateY: isFlipped ? 0 : 180,
      }}
      whileHover={!disabled && !isSelected ? { y: -10, scale: 1.02 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={clsx('card', isSelected && 'selected', disabled && 'disabled', className)}
      style={{
        borderColor: isSelected ? 'rgba(255,255,255,0.4)' : 'var(--glass-border)',
        boxShadow: isSelected ? '0 0 30px rgba(255,255,255,0.2)' : 'none'
      }}
    >
      {/* Front */}
      <div 
        className="card-inner" 
        style={{ backgroundColor: getCardColor() }}
      >
        <div className="card-glow" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="card-label">{config.label}</span>
          <Icon size={14} style={{ opacity: 0.8 }} />
        </div>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
          <div style={{ margin: 'auto' }}>
            <Icon size={40} strokeWidth={1.5} />
          </div>
        </div>

        <div className="card-description">
          {getDescription(card.type)}
        </div>
      </div>

      {/* Back */}
      {!isFlipped && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundColor: 'var(--card-bg)', 
          border: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           <Icons.Flame size={32} style={{ color: 'rgba(255,255,255,0.1)' }} />
        </div>
      )}
    </motion.div>
  );
};

const getDescription = (type) => {
  switch (type) {
    case 'attack': return 'End your turn and force the next player to take 2 turns (Stacks).';
    case 'targeted_attack': return 'End your turn and choose which player takes 2 turns.';
    case 'skip': return 'End your turn without drawing. (Reduces attack turns by 1).';
    case 'defuse': return 'Save yourself from a Bomb. 10 available in game.';
    case 'shuffle': return 'Shuffle the Draw Pile.';
    case 'see_future': return 'Peek at the top 3 cards. You must draw the top one later.';
    case 'alter_future': return 'Peek at the top 3 cards and reorder them as you wish.';
    case 'favor': return 'Pick a player to give you a card of their choice.';
    case 'bingus':
    case 'larry':
    case 'james':
    case 'ronald':
    case 'karmor': return 'Collect 2 (steal random), 3 (demand card), or 5 different (pick from discard).';
    case 'exploding_kitten': return 'Boom! You lose unless you have a Defuse.';
    default: return 'A specialized card with unique powers.';
  }
};
