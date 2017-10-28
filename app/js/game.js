import Board from "./board";


export default class Game {
	constructor() {
		this._board = new Board();
		this._gameOn = false;
		this._userTurn = false;
		this._moveNumber = 0;
		this._moveTracker = 0;
		this._strict = false;
	}

	set view(view) {
		this._view = view;
	}

	init(view) {
		this.view = view;
		this._view.init();
	}

	incrementMoveNumber() {
		this._moveNumber++;
		this._view.renderDisplay(this._moveNumber);
	}

	resetSwitches() {
		this._gameOn = true;
		this._userTurn = false;
		this._moveNumber = this._moveTracker = 0;
	}

	replay(num) {
		let counter = 0;
		const interval = setInterval(() => {
			this._view.renderPanel(this._board.sequence[counter]);
			counter++;
			if(counter > num) {
				clearInterval(interval);
				setTimeout(() => {
					this._userTurn = true;
					if(num === this._moveNumber) this.incrementMoveNumber();
				}, 700);
			}
		}, 800);
	}

	errorSound() {
		const error = this._board.error;
		setTimeout(() => this._view.renderPanel(error), 800);     
	}

	wrongMove(color) {
		return color !== this._board.sequence[this._moveTracker - 1].color;
	}

	rightMove() {
		return this._moveNumber === this._moveTracker;
	}

	lastMove() {
		return this._moveNumber === this._board.sequence.length;
	}

	victory() {
		let counter = 0;
		const interval = setInterval(() => {
			this._view.renderPanel(this._board.sequence[counter]);
			counter++; 
			if(counter === 20) clearInterval(interval);
		}, 200);
	}

	userMove(color) {
		if(!this._gameOn || !this._userTurn) return;
		const panel = this._board.panels[color];
		this._view.renderPanel(panel);
		this._moveTracker++;
		this._userTurn = false;

		if(this.wrongMove(color)) {
			this.errorSound();
			if(this._strict) return setTimeout(() => this.restart(), 1200);
			setTimeout(() => this.replay(this._moveNumber - 1), 1200);
			this._moveTracker = 0;
		}

		else if(this.rightMove()) {
			if(this.lastMove()) return setTimeout(() => this.victory(), 500);
			this.replay(this._moveNumber);
			this._moveTracker = 0;
		}

		else this._userTurn = true;
	}	
	

	restart() {
		this.resetSwitches();
		this._view.renderDisplay(0);
		this._board = new Board();
		this.replay(0);
	}

	strictMode() {
		this._strict = !this._strict;
		this._view.renderStrict(this._strict);
	}

}


