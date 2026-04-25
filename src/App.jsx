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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', width: '100%', maxWidth: '400px', padding: '2rem' }}
        >
          <div style={{ marginBottom: '3rem' }}>
             <Flame size={80} style={{ margin: '0 auto 1.5rem', color: 'var(--accent)' }} />
             <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Exploding</h1>
             <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)' }}>Kittens</h1>
          </div>
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Players</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                <Users size={16} />
                <span style={{ fontWeight: 'monospace', fontSize: '1.25rem' }}>{playerCount}</span>
              </div>
            </div>
            <input 
              type="range" min="2" max="10" 
              value={playerCount} 
              onChange={(e) => setPlayerCount(parseInt(e.target.value))}
              style={{ width: '100%', height: '4px', borderRadius: '2px', cursor: 'pointer', marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
              <span>2 Players</span>
              <span>10 Players</span>
            </div>
          </div>

          <button
            onClick={() => startGame(playerCount)}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1.25rem' }}
          >
            Start Game
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Background Ambience */}
      <div className="atmosphere">
        <div className="glow-1" />
        <div className="glow-2" />
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '800px', 
          height: '800px', 
          background: 'radial-gradient(circle, rgba(0, 204, 255, 0.03) 0%, transparent 70%)', 
          filter: 'blur(120px)' 
        }} />
      </div>

      <GameLog messages={gameLog} />

      {/* Main Board */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top: Opponents */}
        <div style={{ padding: '0 3rem' }}>
          <Opponents players={players} currentPlayerIndex={currentPlayerIndex} />
        </div>

        {/* Center: Play Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          {/* Turn Indicator */}
          <div className="turn-indicator">
            <h2 className={`turn-title ${isUserTurn ? 'active' : ''}`}>
              {isUserTurn ? "Your Turn" : `${players[currentPlayerIndex]?.name}'s Turn`}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              {[...Array(turnsRemaining)].map((_, i) => (
                <div key={i} style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
              ))}
            </div>
          </div>

          <div className="deck-area">
            <Deck 
              count={deck.length} 
              onDraw={drawCard} 
              disabled={!isUserTurn || gameState !== 'playing'} 
            />
            <DiscardPile cards={discardPile} />
          </div>
        </div>

        {/* Bottom: Player Area */}
        <div style={{ position: 'relative' }}>
           <PlayerHand 
             cards={userHand} 
             selectedCardIds={selectedCardIds}
             onCardClick={toggleCardSelection}
             disabled={!isUserTurn && gameState !== 'favoring'}
           />
        </div>
      </div>

      {/* Overlays */}
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '2rem' }}>Choose a card to give as a favor</h2>
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
            style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
              {winner === 'You' ? (
                <><Trophy size={80} style={{ margin: '0 auto 1.5rem', color: 'var(--success)' }} /><h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Victory!</h2></>
              ) : (
                <><Skull size={80} style={{ margin: '0 auto 1.5rem', color: 'var(--accent)' }} /><h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Defeat</h2><p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3rem' }}>{winner} won the game.</p></>
              )}
              <button onClick={() => useGameStore.setState({ gameState: 'lobby' })} className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }}>Main Menu</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
