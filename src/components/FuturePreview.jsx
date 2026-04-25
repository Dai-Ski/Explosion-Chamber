import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Eye } from 'lucide-react';

export const FuturePreview = ({ cards, onClose }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 text-white/40">
          <Eye size={20} />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em]">The Future</h2>
        </div>

        <div className="flex gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                {i === 0 ? 'Top Card' : i === 1 ? 'Second Card' : 'Third Card'}
              </div>
              <Card card={card} disabled />
            </motion.div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-12 bg-white text-black px-12 py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:scale-105 active:scale-95 transition-transform"
        >
          Understood
        </button>
      </div>
    </motion.div>
  );
};
