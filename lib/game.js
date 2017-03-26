import { HumanPlayer } from './player.js';
import Dealer from './dealer.js';

function Game(buyIn, numPlayers) {
  this.players = Game.initPlayers(buyIn, numPlayers);
  this.playing = Game.initPlaying(this.players);
  this.stage = 0;
  this.staged = [];
}

Game.initPlayers = function (buyIn, numPlayers) {
  const players = [];

  for(let i = 0, i < numPlayers; i ++) {
    players.push(new HumanPlayer(buyIn));
  }

  return players;
}
//
Game.initPlaying = function (players) {
  const playing = {};

  for(let i = 0; i < players.length; i ++) {
    playing[i] = true;
  }

  return playing;
}

// Game.prototype.selectPlaying = function() {
//   const playing = [];
//
//   for(let player of this.players) {
//     if(player.folded === false) {
//       playing.push(player);
//     }
//   }
//
//   return playing;
// }

Game.prototype.over = function() {
  // const playing = this.selectPlaying();
  return Object.keys(this.playing).length === 1;
}

Game.prototype.play = function() {
  let playing = this.players;

  while(!this.over()) {
    let minBet = 0;

    for(let playerId in this.playing) {
      let player = this.players[playerId],
          step = player.step();

      if(player.folded) {
        delete this.playing[playerId];
      }

      if(this.over()) {
        this.winner();
        break;
      }
    }

    this.stage ++;
    this.handleStep();
  }
}

Game.prototype.step = function () {
  switch (this.stage) {
    case 1:
      this.flop();
      break;
    case 2:
      this.turn();
      break;
    case 3:
      this.turnOrRiver();
      break;
    case 4:
      this.showdown();
      break;
    default:
      break;
  }
}

Game.prototype.flop = function() {
  this.stage = this.dealer.flop();
  return this.stage;
}

Game.prototype.turnOrRiver = function() {
  this.stage.push(this.dealer.turnOrRiver())
}

Game.prototype.showdown = function() {
  var winner;
  
  for(let playerId in Object.keys(this.playing)) {
    let player = this.players[playerId];
    if(winner === undefined || player.beats(winner)) {
      winner = player;
    }
  }

  return winner;
}
