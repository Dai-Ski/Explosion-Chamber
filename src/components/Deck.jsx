import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export const Deck = ({ count, onDraw, disabled }) => {
  return (
    <div className="deck-container" style={{ position: 'relative' }}>
      {/* Decorative stack effect */}
      {[...Array(Math.min(count, 5))].map((_, i) => (
        <div
          key={i}
          style={{ 
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '1rem',
            transform: `translate3d(${i * 2}px, ${-i * 2}px, 0)`,
            zIndex: -i 
          }}
        />
      ))}
      
      <motion.div
        whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={!disabled ? onDraw : undefined}
        className="draw-pile"
        style={{
          opacity: disabled ? 0.5 : 1,
          filter: disabled ? 'grayscale(1)' : 'none'
        }}
      >
        <div style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          backgroundColor: 'rgba(255,255,255,0.05)'
        }}>
          <Flame 
            size={32} 
            className={!disabled ? 'animate-glow' : ''} 
            style={{ color: !disabled ? 'var(--accent)' : 'rgba(255,255,255,0.1)' }} 
          />
        </div>
        <span style={{ 
          fontSize: '0.7rem', 
          fontWeight: 900, 
          color: 'white', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase' 
        }}>Draw</span>
        <span style={{ 
          marginTop: '0.5rem', 
          fontSize: '1.25rem', 
          fontFamily: 'monospace', 
          color: 'rgba(255,255,255,0.8)' 
        }}>{count}</span>
      </motion.div>

      {count > 0 && !disabled && (
        <div style={{
          position: 'absolute',
          top: '-3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          color: 'black',
          padding: '0.25rem 0.75rem',
          borderRadius: '0.25rem',
          fontSize: '0.6rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          Click to Draw
        </div>
      )}
    </div>
  );
};
