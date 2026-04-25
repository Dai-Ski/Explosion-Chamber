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
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-8"
        >
          <div className="max-w-4xl w-full text-center">
            <h2 className="text-2xl font-black uppercase tracking-[0.3em] mb-12 text-white">{title || 'Select a Target'}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {players.map((player) => {
                if (player.id === currentPlayerId || player.isEliminated) return null;

                return (
                  <motion.button
                    key={player.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(player.id)}
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-full bg-card border border-white/10 flex items-center justify-center group-hover:border-white/50 transition-colors">
                      <User size={32} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">
                      {player.name}
                    </span>
                    <span className="text-[10px] font-mono text-white/20">
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
