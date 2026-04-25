import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';

export const DiscardPile = ({ cards }) => {
  const topCard = cards[0];

  return (
    <div style={{ position: 'relative', width: '8rem', height: '12rem' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '1rem',
        border: '2px dashed rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.02)'
      }}>
        <span style={{
          fontSize: '0.6rem',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.1)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em'
        }}>Discard</span>
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
            <Card card={topCard} disabled style={{ pointerEvents: 'none' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {cards.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '-1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.6rem',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.2)'
        }}>
          {cards.length} cards
        </div>
      )}
    </div>
  );
};
