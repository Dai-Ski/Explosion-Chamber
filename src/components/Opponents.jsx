import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export const Opponents = ({ players, currentPlayerIndex }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '2rem', 
      padding: '1rem 0' 
    }}>
      {players.map((player) => {
        if (player.id === 0) return null; // Skip self

        const isCurrent = currentPlayerIndex === player.id;
        const isEliminated = player.isEliminated;

        return (
          <motion.div
            key={player.id}
            initial={false}
            animate={{
              scale: isCurrent ? 1.1 : 1,
              opacity: isEliminated ? 0.3 : 1,
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              borderRadius: '1rem',
              border: '1px solid',
              borderColor: isCurrent ? 'rgba(255,255,255,0.2)' : 'transparent',
              backgroundColor: isCurrent ? 'rgba(255,255,255,0.05)' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              position: 'relative',
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isCurrent ? 'white' : 'var(--card-bg)',
              color: isCurrent ? 'black' : 'rgba(255,255,255,0.4)',
              border: '1px solid var(--glass-border)'
            }}>
              <User size={20} />
              {isCurrent && (
                <motion.div
                  layoutId="current-indicator"
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.5)'
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: isCurrent ? 'white' : 'rgba(255,255,255,0.4)'
              }}>
                {player.name}
              </p>
              {!isEliminated && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                   <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                   <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
                     {player.hand.length} cards
                   </span>
                </div>
              )}
              {isEliminated && (
                <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent)', textTransform: 'uppercase' }}>
                  Eliminated
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
