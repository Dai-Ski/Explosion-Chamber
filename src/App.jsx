import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { Deck } from './components/Deck';
import { DiscardPile } from './components/DiscardPile';
import { PlayerHand } from './components/PlayerHand';
import { Opponents } from './components/Opponents';
import { GameLog } from './components/GameLog';
import { ActionPanel } from './components/ActionPanel';
import { FuturePreview } from './components/FuturePreview';
import { TargetSelection } from './components/TargetSelection';
import { AlterFutureModal } from './components/AlterFutureModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Skull, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

const App = () => {
  const {
    deck,
    discardPile,
    players,
    currentPlayerIndex,
    turnsRemaining,
    gameLog,
    gameState,
    winner,
    futureCards,
    selectedCardIds,
    startGame,
    drawCard,
    playCard,
    toggleCardSelection,
    handleTargetSelect,
    reorderFuture,
    handleFavorResponse
  } = useGameStore();

  const [playerCount, setPlayerCount] = useState(4);
  const isUserTurn = currentPlayerIndex === 0;
  const userHand = players[0]?.hand || [];
  const selectedCards = userHand.filter(c => selectedCardIds.includes(c.id));

  useEffect(() => {
    if (gameState === 'gameOver' && winner === 'You') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#FF3B30', '#34C759']
      });
    }
  }, [gameState, winner]);

  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-md p-8"
        >
          <div className="mb-12">
             <Flame size={80} className="mx-auto text-accent mb-6" />
             <h1 className="text-4xl font-black uppercase tracking-[0.2em]">Exploding</h1>
             <h1 className="text-4xl font-black uppercase tracking-[0.2em] text-accent">Kittens</h1>
          </div>
          
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Players</span>
              <div className="flex items-center gap-2 text-white">
                <Users size={16} />
                <span className="font-mono text-xl">{playerCount}</span>
              </div>
            </div>
            <input 
              type="range" min="2" max="10" 
              value={playerCount} 
              onChange={(e) => setPlayerCount(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white mb-4"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/20">
              <span>2 Players</span>
              <span>10 Players</span>
            </div>
          </div>

          <button
            onClick={() => startGame(playerCount)}
            className="w-full py-5 bg-accent text-white font-black uppercase tracking-[0.3em] text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20 border border-white/10"
          >
            Start Game
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-success/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-info/[0.03] rounded-full blur-[120px]" />
      </div>

      <GameLog messages={gameLog} />

      <div className="relative z-10 h-screen flex flex-col justify-between py-12">
        <div className="px-12">
          <Opponents players={players} currentPlayerIndex={currentPlayerIndex} />
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className={`text-xs font-black uppercase tracking-[0.4em] mb-2 transition-colors ${
              isUserTurn ? 'text-white' : 'text-white/20'
            }`}>
              {isUserTurn ? "Your Turn" : `${players[currentPlayerIndex]?.name}'s Turn`}
            </h2>
            <div className="flex items-center justify-center gap-2">
              {[...Array(turnsRemaining)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-accent" />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-24">
            <Deck count={deck.length} onDraw={drawCard} disabled={!isUserTurn || gameState !== 'playing'} />
            <DiscardPile cards={discardPile} />
          </div>
        </div>

        <div className="relative">
           <PlayerHand 
             cards={userHand} 
             selectedCardIds={selectedCardIds}
             onCardClick={toggleCardSelection}
             disabled={!isUserTurn && gameState !== 'favoring'}
           />
        </div>
      </div>

      {/* Conditional UI based on game state */}
      <ActionPanel 
        isVisible={selectedCardIds.length > 0 && isUserTurn && gameState === 'playing'}
        selectedCards={selectedCards}
        onPlay={playCard}
        onCancel={() => useGameStore.setState({ selectedCardIds: [] })}
      />

      <TargetSelection 
        isOpen={gameState === 'targeting'}
        players={players}
        currentPlayerId={0}
        onSelect={handleTargetSelect}
        title="Select Target"
      />

      <FuturePreview 
        cards={futureCards} 
        onClose={() => useGameStore.setState({ futureCards: [] })} 
      />

      <AlterFutureModal 
        isOpen={gameState === 'future_altering'}
        cards={futureCards}
        onConfirm={reorderFuture}
      />

      {/* Favor Response UI */}
      {gameState === 'favoring' && isUserTurn && (
        <div className="fixed inset-0 z-[150] bg-black/90 flex flex-col items-center justify-center p-8">
          <h2 className="text-xl font-black uppercase tracking-[0.3em] mb-8">Choose a card to give as a favor</h2>
          <PlayerHand 
            cards={userHand}
            selectedCardIds={selectedCardIds.slice(0, 1)}
            onCardClick={handleFavorResponse}
            disabled={false}
          />
        </div>
      )}

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameState === 'gameOver' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-8"
          >
            <div className="max-w-md w-full text-center">
              {winner === 'You' ? (
                <><Trophy size={80} className="mx-auto text-success mb-6" /><h2 className="text-4xl font-black uppercase tracking-widest mb-4">Victory!</h2></>
              ) : (
                <><Skull size={80} className="mx-auto text-accent mb-6" /><h2 className="text-4xl font-black uppercase tracking-widest mb-4">Defeat</h2><p className="text-white/40 mb-12">{winner} won the game.</p></>
              )}
              <button onClick={() => useGameStore.setState({ gameState: 'lobby' })} className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-5 rounded-full hover:scale-105 transition-transform">Main Menu</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
