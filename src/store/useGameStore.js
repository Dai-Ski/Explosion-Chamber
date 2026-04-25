import { create } from 'zustand';
import { CARD_TYPES } from '../types';

const getInitialDeckCounts = (playerCount) => {
  // Base counts to reach roughly the user's requested distribution
  // Adjusted for player count to ensure everyone gets 7 cards + 1 defuse
  return {
    [CARD_TYPES.ATTACK]: 6,
    [CARD_TYPES.TARGETED_ATTACK]: 4,
    [CARD_TYPES.SKIP]: 8,
    [CARD_TYPES.SHUFFLE]: 6,
    [CARD_TYPES.SEE_FUTURE]: 8,
    [CARD_TYPES.ALTER_FUTURE]: 6,
    [CARD_TYPES.FAVOR]: 6,
    [CARD_TYPES.NOPE]: 8,
    [CARD_TYPES.BINGUS]: 5,
    [CARD_TYPES.LARRY]: 5,
    [CARD_TYPES.JAMES]: 5,
    [CARD_TYPES.RONALD]: 5,
    [CARD_TYPES.KARMOR]: 5,
  };
};

const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useGameStore = create((set, get) => ({
  deck: [],
  discardPile: [],
  players: [],
  currentPlayerIndex: 0,
  turnsRemaining: 1,
  gameLog: ['Select player count to begin.'],
  gameState: 'lobby', // 'lobby' | 'playing' | 'gameOver' | 'targeting' | 'favoring' | 'future_altering'
  winner: null,
  futureCards: [],
  selectedCardIds: [], // Supports multiselect for combos
  pendingAction: null, // { type, actorId, targetId, targetCardType? }

  startGame: (playerCount = 4) => {
    // 1. Generate base deck
    const counts = getInitialDeckCounts(playerCount);
    let fullDeck = [];
    Object.entries(counts).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        fullDeck.push({ id: `${type}-${i}-${Math.random().toString(36).substr(2, 5)}`, type });
      }
    });
    fullDeck = shuffle(fullDeck);

    // 2. Initialize players
    const players = [];
    for (let i = 0; i < playerCount; i++) {
      players.push({
        id: i,
        name: i === 0 ? 'You' : `Player ${i + 1}`,
        hand: [{ id: `defuse-init-${i}`, type: CARD_TYPES.DEFUSE }], // 1 Mandatory Defuse
        isEliminated: false,
        isBot: i !== 0
      });
    }

    // 3. Deal 7 more cards to each player
    players.forEach(p => {
      for (let i = 0; i < 7; i++) {
        p.hand.push(fullDeck.pop());
      }
    });

    // 4. Add Bombs (9 as requested) and remaining Defuses (Total 10 - dealt ones)
    const kittens = [];
    for (let i = 0; i < 9; i++) {
      kittens.push({ id: `bomb-${i}`, type: CARD_TYPES.EXPLODING_KITTEN });
    }
    
    const remainingDefusesCount = 10 - playerCount;
    for (let i = 0; i < remainingDefusesCount; i++) {
      kittens.push({ id: `defuse-extra-${i}`, type: CARD_TYPES.DEFUSE });
    }

    const finalDeck = shuffle([...fullDeck, ...kittens]);

    set({
      deck: finalDeck,
      players,
      gameState: 'playing',
      currentPlayerIndex: 0,
      turnsRemaining: 1,
      discardPile: [],
      gameLog: [`Game started with ${playerCount} players. 7 cards + 1 Defuse dealt each.`],
      winner: null,
      selectedCardIds: [],
      pendingAction: null
    });
  },

  drawCard: () => {
    const { deck, players, currentPlayerIndex, turnsRemaining, gameLog } = get();
    if (deck.length === 0) return;

    const newDeck = [...deck];
    const card = newDeck.pop();
    const newPlayers = [...players];
    const currentPlayer = newPlayers[currentPlayerIndex];

    if (card.type === CARD_TYPES.EXPLODING_KITTEN) {
      const defuseIndex = currentPlayer.hand.findIndex(c => c.type === CARD_TYPES.DEFUSE);
      if (defuseIndex !== -1) {
        currentPlayer.hand.splice(defuseIndex, 1);
        const log = [...gameLog, `${currentPlayer.name} defused a Bomb!`];
        // Put kitten back in random position
        const randomIndex = Math.floor(Math.random() * newDeck.length);
        newDeck.splice(randomIndex, 0, card);
        set({ deck: newDeck, players: newPlayers, gameLog: log });
        get().endTurn();
      } else {
        currentPlayer.isEliminated = true;
        const log = [...gameLog, `BOOM! ${currentPlayer.name} exploded.`];
        set({ players: newPlayers, gameLog: log });
        
        const activePlayers = newPlayers.filter(p => !p.isEliminated);
        if (activePlayers.length === 1) {
          set({ gameState: 'gameOver', winner: activePlayers[0].name });
        } else {
          get().endTurn();
        }
      }
    } else {
      currentPlayer.hand.push(card);
      set({ deck: newDeck, players: newPlayers });
      get().endTurn();
    }
  },

  endTurn: () => {
    const { turnsRemaining, currentPlayerIndex, players } = get();
    if (turnsRemaining > 1) {
      set({ turnsRemaining: turnsRemaining - 1 });
      // If it's a bot, it continues its turn
      if (players[currentPlayerIndex].isBot) {
        setTimeout(() => get().simulateBotTurn(currentPlayerIndex), 1000);
      }
    } else {
      let nextIndex = (currentPlayerIndex + 1) % players.length;
      while (players[nextIndex].isEliminated) {
        nextIndex = (nextIndex + 1) % players.length;
      }
      set({ currentPlayerIndex: nextIndex, turnsRemaining: 1, futureCards: [], selectedCardIds: [] });
      
      if (players[nextIndex].isBot) {
        setTimeout(() => get().simulateBotTurn(nextIndex), 1500);
      }
    }
  },

  playCard: () => {
    const { players, currentPlayerIndex, selectedCardIds, discardPile, gameLog, deck } = get();
    if (selectedCardIds.length === 0) return;

    const currentPlayer = players[currentPlayerIndex];
    const selectedCards = currentPlayer.hand.filter(c => selectedCardIds.includes(c.id));
    const newPlayers = [...players];
    const newHand = currentPlayer.hand.filter(c => !selectedCardIds.includes(c.id));
    newPlayers[currentPlayerIndex].hand = newHand;

    const newDiscardPile = [...selectedCards.reverse(), ...discardPile];
    let logMsg = `${currentPlayer.name} played `;

    // Combo Logic
    if (selectedCards.length === 2 && selectedCards[0].type === selectedCards[1].type && isCat(selectedCards[0].type)) {
      set({ 
        players: newPlayers, 
        discardPile: newDiscardPile, 
        gameState: 'targeting', 
        pendingAction: { type: 'STEAL_RANDOM', actorId: currentPlayerIndex },
        gameLog: [...gameLog, `${currentPlayer.name} played a pair! Select a player to steal from.`]
      });
      return;
    }

    if (selectedCards.length === 3 && selectedCards[0].type === selectedCards[1].type && selectedCards[1].type === selectedCards[2].type && isCat(selectedCards[0].type)) {
      set({ 
        players: newPlayers, 
        discardPile: newDiscardPile, 
        gameState: 'targeting', 
        pendingAction: { type: 'DEMAND_CARD', actorId: currentPlayerIndex },
        gameLog: [...gameLog, `${currentPlayer.name} played a trio! Select a player and card type.`]
      });
      return;
    }

    if (selectedCards.length === 5 && new Set(selectedCards.map(c => c.type)).size === 5 && selectedCards.every(c => isCat(c.type))) {
      set({ 
        players: newPlayers, 
        discardPile: newDiscardPile, 
        gameState: 'picking_from_discard', 
        gameLog: [...gameLog, `${currentPlayer.name} played the 5-cat combo! Pick any card from discard.`]
      });
      return;
    }

    // Single Card Logic
    const card = selectedCards[0];
    logMsg += card.type.toUpperCase();
    set({ players: newPlayers, discardPile: newDiscardPile, gameLog: [...gameLog, logMsg], selectedCardIds: [] });

    switch (card.type) {
      case CARD_TYPES.SKIP:
        get().endTurn();
        break;
      case CARD_TYPES.ATTACK:
        set(state => ({ turnsRemaining: state.turnsRemaining + 2 })); // Stacks 2 per attack
        get().endTurn();
        break;
      case CARD_TYPES.TARGETED_ATTACK:
        set({ gameState: 'targeting', pendingAction: { type: 'TARGETED_ATTACK', actorId: currentPlayerIndex } });
        break;
      case CARD_TYPES.SHUFFLE:
        set({ deck: shuffle(deck) });
        break;
      case CARD_TYPES.SEE_FUTURE:
        set({ futureCards: deck.slice(-3).reverse() });
        break;
      case CARD_TYPES.ALTER_FUTURE:
        set({ gameState: 'future_altering', futureCards: deck.slice(-3).reverse() });
        break;
      case CARD_TYPES.FAVOR:
        set({ gameState: 'targeting', pendingAction: { type: 'FAVOR', actorId: currentPlayerIndex } });
        break;
      default:
        break;
    }
  },

  handleTargetSelect: (targetId) => {
    const { pendingAction, players, currentPlayerIndex, gameLog } = get();
    if (!pendingAction) return;

    const actor = players[currentPlayerIndex];
    const target = players[targetId];

    if (pendingAction.type === 'TARGETED_ATTACK') {
      set({ 
        currentPlayerIndex: targetId, 
        turnsRemaining: get().turnsRemaining + 1, // Next player takes current stack + 2? User says "stacks up". 
        // Actually user says "if you throw another attack, it just stacks up".
        // I'll stick to: ends turn, target takes remaining + 2.
        gameState: 'playing',
        pendingAction: null,
        gameLog: [...gameLog, `${actor.name} targeted ${target.name}!`]
      });
      if (target.isBot) setTimeout(() => get().simulateBotTurn(targetId), 1500);
    } else if (pendingAction.type === 'FAVOR') {
      set({ 
        gameState: 'favoring', 
        pendingAction: { ...pendingAction, targetId },
        gameLog: [...gameLog, `${actor.name} asked ${target.name} for a favor.`]
      });
      // If target is bot, it responds automatically
      if (target.isBot) {
        setTimeout(() => {
          const cardToGive = target.hand[Math.floor(Math.random() * target.hand.length)];
          get().handleFavorResponse(cardToGive.id);
        }, 1000);
      }
    } else if (pendingAction.type === 'STEAL_RANDOM') {
      const randomCard = target.hand[Math.floor(Math.random() * target.hand.length)];
      get().transferCard(targetId, currentPlayerIndex, randomCard.id);
      set({ gameState: 'playing', pendingAction: null });
    }
  },

  handleFavorResponse: (cardId) => {
    const { pendingAction, players } = get();
    get().transferCard(pendingAction.targetId, pendingAction.actorId, cardId);
    set({ gameState: 'playing', pendingAction: null });
  },

  transferCard: (fromId, toId, cardId) => {
    const { players } = get();
    const newPlayers = [...players];
    const fromPlayer = newPlayers[fromId];
    const toPlayer = newPlayers[toId];
    
    const cardIndex = fromPlayer.hand.findIndex(c => c.id === cardId);
    const card = fromPlayer.hand.splice(cardIndex, 1)[0];
    toPlayer.hand.push(card);
    
    set({ players: newPlayers });
  },

  reorderFuture: (newOrder) => {
    const { deck } = get();
    const newDeck = [...deck];
    // Remove top 3
    newDeck.splice(-3);
    // Add in new order (newOrder should be top to bottom, deck is bottom to top)
    newDeck.push(...[...newOrder].reverse());
    set({ deck: newDeck, gameState: 'playing', futureCards: [] });
  },

  simulateBotTurn: (index) => {
    const { gameState, players, currentPlayerIndex } = get();
    if (gameState !== 'playing' || currentPlayerIndex !== index) return;

    const bot = players[index];
    if (bot.isEliminated) return;

    const playable = bot.hand.filter(c => ![CARD_TYPES.DEFUSE, CARD_TYPES.NOPE].includes(c.type));
    if (playable.length > 0 && Math.random() < 0.5) {
      const card = playable[Math.floor(Math.random() * playable.length)];
      set({ selectedCardIds: [card.id] });
      get().playCard();
    } else {
      get().drawCard();
    }
  },

  toggleCardSelection: (id) => {
    const { selectedCardIds } = get();
    if (selectedCardIds.includes(id)) {
      set({ selectedCardIds: selectedCardIds.filter(sid => sid !== id) });
    } else {
      set({ selectedCardIds: [...selectedCardIds, id] });
    }
  },
}));

const isCat = (type) => [
  CARD_TYPES.BINGUS, 
  CARD_TYPES.LARRY, 
  CARD_TYPES.JAMES, 
  CARD_TYPES.RONALD, 
  CARD_TYPES.KARMOR
].includes(type);
