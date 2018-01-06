import Board from "./board";
import pubSub from "./pubsub";


export default class Game {
	constructor() {
		this.board = new Board();
		this.gameOn = false;
		this.userTurn = false;
		this.moveNumber = 0;
		this.moveTracker = 0;
		this.strict = false;
		this.cacheDom();
		this.bindEvents();
	}

	cacheDom() {
		this.$main = $(".main");
		this.$panel = this.$main.find(".col-xs-6");
		this.$start = this.$main.find(".start");
		this.$strict = this.$main.find(".strict");
	}

	bindEvents() {
		this.$panel.click((e) => {
			this.userMove(e.target.id);
		});
		this.$start.click(() => {
			this.restart();
		});
		this.$strict.click(() => {
			this.strictMode();
		});
	}

	replay(num) {
		let counter = 0;
		this.moveTracker = 0;
		const interval = setInterval(() => {
			pubSub.publish("updatePanel", this.board.sequence[counter]);
			counter++;
			if(counter > num) {
				clearInterval(interval);
				setTimeout(() => {
					this.userTurn = true;
					//if num === this.moveNumber, its playing the next move after a right answer
					//if num < this.moveNumber, its replaying due to a wrong answer
					if(num === this.moveNumber) {
						this.moveNumber++;
						pubSub.publish("updateDisplay", this.moveNumber);
					}
				}, 700);
			}
		}, 800);
	}

	errorSound() {
		const error = this.board.error;
		setTimeout(() => {
			pubSub.publish("updatePanel", error);
		}, 800);     
	}

	wrongMove(color) {
		return color !== this.board.sequence[this.moveTracker - 1].color;
	}

	rightMove() {
		return this.moveNumber === this.moveTracker;
	}

	endOfGame() {
		return this.moveNumber === this.board.sequence.length;
	}

	//This function is only called if the player beats the game
	victory() {
		let counter = 0;
		const interval = setInterval(() => {
			if(this.board.sequence[counter]) {
				pubSub.publish("updatePanel", this.board.sequence[counter]);
				counter++;
			} else {
				clearInterval(interval);
				this.gameOn = false;
				pubSub.publish("updateDisplay", "");
			}
		}, 200);
	}

	userMove(color) {
		if(this.gameOn && this.userTurn) {
			pubSub.publish("updatePanel", this.board.panels[color]);
			this.moveTracker++;
			this.userTurn = false;

			if(this.wrongMove(color) && this.strict) {
				this.errorSound();
				setTimeout(() => {
					this.restart();
				}, 1200);
			
			} else if(this.wrongMove(color) && !this.strict) {
				this.errorSound();
				setTimeout(() => {
					this.replay(this.moveNumber - 1);
				}, 1200);
			
			} else if(this.rightMove() && this.endOfGame()) {
				//The game has been beaten and the victory sequence is played
				setTimeout(() => {
					this.victory();
				}, 500);
			
			} else if(this.rightMove() && !this.endOfGame()) {
				this.replay(this.moveNumber);
			
			} else {
				this.userTurn = true;
			}
		}
	}

	restart() {
		this.gameOn = true;
		this.userTurn = false;
		this.moveNumber = this.moveTracker = 0;
		pubSub.publish("updateDisplay", 0);
		this.board = new Board();
		this.replay(0);
	}


	strictMode() {
		this.strict = !this.strict;
		pubSub.publish("updateStrict", this.strict);
	}

}


