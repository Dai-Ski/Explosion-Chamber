import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Eye } from 'lucide-react';

export const FuturePreview = ({ cards, onClose }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
          <Eye size={20} />
          <h2 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>The Future</h2>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {i === 0 ? 'Top Card' : i === 1 ? 'Second Card' : 'Third Card'}
              </div>
              <Card card={card} disabled />
            </motion.div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ marginTop: '3rem', padding: '1rem 4rem' }}
        >
          Understood
        </button>
      </div>
    </motion.div>
  );
};
