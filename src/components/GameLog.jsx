import { motion, AnimatePresence } from 'framer-motion';

export const GameLog = ({ messages }) => {
  return (
    <div style={{
      position: 'absolute',
      left: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16rem',
      height: '24rem',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 20
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '0.5rem',
        height: '100%',
        justifyContent: 'flex-start'
      }}>
        <AnimatePresence initial={false}>
          {messages.slice(-8).reverse().map((msg, i) => (
            <motion.div
              key={i + msg}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1 - i * 0.1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.7rem',
                fontWeight: 500,
                lineHeight: 1.4
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.4)', marginRight: '0.5rem', fontFamily: 'monospace' }}>
                [{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
              </span>
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
