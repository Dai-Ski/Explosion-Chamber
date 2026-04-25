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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', maxWidth: '1200px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Settings2 size={24} style={{ color: 'var(--info)' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em' }}>Alter the Future</h2>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '-1rem' }}>
          Drag cards to reorder. Top card is on the left.
        </p>

        <Reorder.Group 
          axis="x" 
          values={items} 
          onReorder={setItems} 
          style={{ display: 'flex', gap: '1.5rem', padding: '2rem', listStyle: 'none' }}
        >
          {items.map((card) => (
            <Reorder.Item
              key={card.id}
              value={card}
              whileDrag={{ scale: 1.1, rotate: 2 }}
              style={{ position: 'relative', cursor: 'grab' }}
            >
              <div style={{ position: 'absolute', top: '-2.5rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.2 }}>
                <GripHorizontal size={20} />
              </div>
              <Card card={card} disabled style={{ pointerEvents: 'none' }} />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <button
          onClick={() => onConfirm(items)}
          className="btn btn-primary"
          style={{ backgroundColor: 'var(--info)', marginTop: '2rem', padding: '1rem 4rem' }}
        >
          Save Order
        </button>
      </div>
    </motion.div>
  );
};
