import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';

export const PlayerHand = ({ cards, selectedCardIds, onCardClick, disabled }) => {
  return (
    <div className="player-hand-container">
      <div 
        className="hand-scroll"
        style={{
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          padding: '2rem 1rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', delay: index * 0.05 }}
              style={{
                marginLeft: index === 0 ? 0 : '-2rem',
                zIndex: index
              }}
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
        <div style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.1)',
          fontSize: '0.8rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          padding: '3rem 0'
        }}>
          Your hand is empty
        </div>
      )}
    </div>
  );
};
