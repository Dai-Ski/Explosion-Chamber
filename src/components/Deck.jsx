import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export const Deck = ({ count, onDraw, disabled }) => {
  return (
    <div className="relative group perspective-1000">
      {/* Decorative stack effect */}
      {[...Array(Math.min(count, 5))].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-[#1A1A1A] border border-white/10 rounded-xl"
          style={{ 
            transform: `translate3d(${i * 2}px, ${-i * 2}px, 0)`,
            zIndex: -i 
          }}
        />
      ))}
      
      <motion.div
        whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={!disabled ? onDraw : undefined}
        className={`relative w-32 h-48 rounded-xl bg-card border-2 border-white/10 flex flex-col items-center justify-center cursor-pointer transition-all ${
          disabled ? 'opacity-50 grayscale' : 'hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]'
        }`}
      >
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-4 bg-white/5">
          <Flame size={32} className={`transition-colors ${disabled ? 'text-white/10' : 'text-accent animate-pulse'}`} />
        </div>
        <span className="text-xs font-black text-white tracking-[0.2em] uppercase">Draw</span>
        <span className="mt-2 text-xl font-mono text-white/80">{count}</span>
      </motion.div>

      {count > 0 && !disabled && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white text-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
          Click to Draw
        </div>
      )}
    </div>
  );
};
