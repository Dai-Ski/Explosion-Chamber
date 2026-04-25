import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';

export const Opponents = ({ players, currentPlayerIndex }) => {
  return (
    <div className="flex justify-center gap-8 py-4">
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
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-colors ${
              isCurrent 
                ? 'bg-white/5 border-white/20' 
                : 'bg-transparent border-transparent'
            }`}
          >
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
              isCurrent ? 'bg-white text-black' : 'bg-card text-white/40'
            }`}>
              <User size={24} />
              {isCurrent && (
                <motion.div
                  layoutId="current-indicator"
                  className="absolute -inset-1 rounded-full border border-white/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </div>
            
            <div className="text-center">
              <p className={`text-xs font-bold uppercase tracking-wider ${
                isCurrent ? 'text-white' : 'text-white/40'
              }`}>
                {player.name}
              </p>
              {!isEliminated && (
                <div className="flex items-center justify-center gap-1 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                   <span className="text-[10px] font-mono text-white/20">{player.hand.length} cards</span>
                </div>
              )}
              {isEliminated && (
                <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">Eliminated</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
