import { motion, AnimatePresence } from 'framer-motion';

export const GameLog = ({ messages }) => {
  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 h-96 pointer-events-none overflow-hidden">
      <div className="flex flex-col-reverse gap-2 h-full justify-start">
        <AnimatePresence initial={false}>
          {messages.slice(-8).reverse().map((msg, i) => (
            <motion.div
              key={i + msg}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1 - i * 0.1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-md border border-white/5 p-3 rounded-lg text-[11px] font-medium leading-relaxed"
            >
              <span className="text-white/40 mr-2 font-mono">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
