import { Card, RANKS, SUITS } from 'cards.js';
function Deck() {
  this.cards = this.initDeck();
}

Deck.initDeck = function() {
  const cards = [];

  SUITS.forEach(suit => {
    return RANKS.forEach( rank => {
      cards.push(new Card(suit, rank)));
    }
  })

  return cards;
}
