import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

export const TargetSelection = ({ players, currentPlayerId, onSelect, isOpen, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.3em', 
              marginBottom: '3rem', 
              color: 'white' 
            }}>{title || 'Select a Target'}</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {players.map((player) => {
                if (player.id === currentPlayerId || player.isEliminated) return null;

                return (
                  <motion.button
                    key={player.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(player.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.5rem',
                      borderRadius: '1rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: 'white'
                    }}
                  >
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={32} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {player.name}
                    </span>
                    <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
                      {player.hand.length} cards
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
