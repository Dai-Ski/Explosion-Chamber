import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export const ActionPanel = ({ isVisible, onPlay, onCancel, selectedCards }) => {
  const isCombo = selectedCards.length > 1;
  const label = isCombo 
    ? `Play Combo (${selectedCards.length})` 
    : `Play ${selectedCards[0]?.type?.toUpperCase()}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 20, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 20, opacity: 0, x: '-50%' }}
          style={{
            position: 'fixed',
            bottom: '8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            paddingRight: '1.5rem',
            borderRadius: '9999px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 100
          }}
        >
          <button
            onClick={onPlay}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'black',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Play size={14} fill="currentColor" />
            {label}
          </button>
          
          <button
            onClick={onCancel}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
