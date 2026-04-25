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
          className="fixed bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white text-black p-2 pr-6 rounded-full shadow-2xl z-50"
        >
          <button
            onClick={onPlay}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-transform"
          >
            <Play size={14} fill="currentColor" />
            {label}
          </button>
          
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
