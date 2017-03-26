import { Card, RANKS, SUITS } from './cards.js';

function Deck() {
  this.cards = this.initDeck();
  this.shuffle();
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

Deck.prototype.deal = function () {
  let hand = [];
  for(let i = 0; i < 2; i ++) {
    hand.push(this.cards.shift());
  }

  return hand;
};

Deck.prototype.hit = function () {
  return this.cards.shift();
}

Deck.prototype.shuffle = function () {
  for(let i = 51; i > 0; i --) {
    let j = Math.floor(Math.random * i);
    [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
  }
}

export default Deck;
