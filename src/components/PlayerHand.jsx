import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';

export const PlayerHand = ({ cards, selectedCardIds, onCardClick, disabled }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-center -space-x-8 hover:space-x-2 transition-all duration-500 overflow-x-auto no-scrollbar pb-12 pt-8 px-12">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', delay: index * 0.05 }}
            >
              <Card
                card={card}
                isSelected={selectedCardIds.includes(card.id)}
                onClick={() => onCardClick(card.id)}
                disabled={disabled}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {cards.length === 0 && (
        <div className="text-center text-white/20 text-sm font-medium uppercase tracking-widest py-12">
          Your hand is empty
        </div>
      )}
    </div>
  );
};
