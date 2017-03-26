import Hand from './hand.js';

function Player(cash) {
  this.hand = new Hand();
  this.cash = cash;
  this.bet = 0;
  this.folded = false;
}

Player.prototype.fold = function() {
  this.fold = true;
}

Player.prototype.beats = function(otherPlayer) {
  return this.hand.beats(otherPlayer.hand);
}

export function HumanPlayer(cash) {
  Player.call(this, cash);
}

HumanPlayer.prototype.step(currBet) {
  let move = prompt('raise, call, or fold?');

  switch (move) {
    case 'raise':
      this.raise(currBet);
      break;
    case 'call':
      this.call(currBet)
      break;
    case 'fold':
      this.fold();
      break;
    default:
      this.turn()
  }
}

HumanPlayer.prototype.call(currBet) {
  let bet = currBet - this.bet;

  if(this.cash > bet) {
    this.bet += bet;
    this.cash -= bet;
    return this.bet;
  } else {
    alert("You can't call!");
  }
}

HumanPlayer.prototype.raise(currBet) {
  let bet = prompt('How much do you want to raise?'),
      minRaise = currBet - this.bet;

  if(bet <= minRaise) {
    alert("You need to raise more than that");
  } else if(this.cash < bet) {
    alert("You don't have enough cash");
  } else {
    this.bet += bet;
    this.cash -= bet;
    return this.bet;
  }
}

HumanPlayer.prototype = Object.create(Player);
HumanPlayer.prototype.constructor = HumanPlayer;
