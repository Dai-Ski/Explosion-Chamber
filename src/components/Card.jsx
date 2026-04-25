import { motion } from 'framer-motion';
import { CARD_CONFIG } from '../types';
import * as Icons from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ card, isSelected, onClick, disabled, className, isFlipped = true }) => {
  const config = CARD_CONFIG[card.type] || { label: 'Unknown', color: 'bg-gray-500', icon: 'HelpCircle' };
  const Icon = Icons[config.icon] || Icons.HelpCircle;

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
      className={cn(
        "relative w-32 h-48 rounded-xl cursor-pointer flex-shrink-0 card-shadow overflow-hidden transition-all duration-300",
        isSelected ? "ring-4 ring-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "hover:shadow-xl",
        disabled && "opacity-50 cursor-not-allowed grayscale",
        className
      )}
    >
      {/* Front */}
      <div className={cn(
        "absolute inset-0 p-3 flex flex-col justify-between border border-white/20",
        config.color
      )}>
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{config.label}</span>
          <Icon size={14} className="opacity-80" />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <Icon size={40} strokeWidth={1.5} />
        </div>

        <div className="text-[10px] font-medium leading-tight opacity-90">
          {getDescription(card.type)}
        </div>
      </div>

      {/* Back (Hidden when flipped) */}
      {!isFlipped && (
        <div className="absolute inset-0 bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/5 flex items-center justify-center">
             <Icons.Flame size={32} className="text-white/20" />
          </div>
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
