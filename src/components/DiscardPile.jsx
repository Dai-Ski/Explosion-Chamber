import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';

export const DiscardPile = ({ cards }) => {
  const topCard = cards[0];

  return (
    <div className="relative w-32 h-48">
      <div className="absolute inset-0 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Discard</span>
      </div>
      
      <AnimatePresence mode="popLayout">
        {topCard && (
          <motion.div
            key={topCard.id}
            initial={{ scale: 0.8, opacity: 0, y: 20, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <Card card={topCard} disabled className="pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {cards.length > 1 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20">
          {cards.length} cards
        </div>
      )}
    </div>
  );
};
