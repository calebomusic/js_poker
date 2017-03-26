import Deck from './deck.js';
import { Card, RANKS, SUITS } from './cards.js';

function Dealer() {
  this.deck = Deck();
}

Dealer.prototype.deal = function(players) {
  for(let player of players) {
    player.hand = this.deck.deal();
  }
}

Dealer.prototype.flop = function () {
  const staged = [];

  for(let i = 0; i < 3; i ++) {
    staged.push(this.deck.hit());
  }

  return staged;
};

Dealer.prototype.turnOrRiver = function () {
  this.deck.hit();
  return this.deck.hit();
};

export default Dealer;
