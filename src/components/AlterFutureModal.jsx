import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Card } from './Card';
import { Settings2, GripHorizontal } from 'lucide-react';

export const AlterFutureModal = ({ cards, onConfirm, isOpen }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (cards) setItems(cards);
  }, [cards]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-12 max-w-5xl w-full">
        <div className="flex items-center gap-4">
          <Settings2 size={24} className="text-indigo-400" />
          <h2 className="text-xl font-black uppercase tracking-[0.3em]">Alter the Future</h2>
        </div>

        <p className="text-white/40 text-xs font-medium uppercase tracking-widest -mt-8">
          Drag cards to reorder. Top card is on the left.
        </p>

        <Reorder.Group axis="x" values={items} onReorder={setItems} className="flex gap-6 p-8">
          {items.map((card) => (
            <Reorder.Item
              key={card.id}
              value={card}
              whileDrag={{ scale: 1.1, rotate: 2 }}
              className="relative cursor-grab active:cursor-grabbing group"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripHorizontal className="text-white/20" />
              </div>
              <Card card={card} disabled className="pointer-events-none" />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <button
          onClick={() => onConfirm(items)}
          className="mt-8 bg-indigo-500 text-white px-16 py-5 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20"
        >
          Save Order
        </button>
      </div>
    </motion.div>
  );
};
