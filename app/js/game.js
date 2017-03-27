import Board from "./board";


export default class Game {
	constructor(view) {
		this._view = view;
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
    		var panel = this._board.sequence[counter];
    		this._view.renderPanel(panel);
    		counter++;
    		if(counter > num) {
    			clearInterval(interval);
    			setTimeout(() => {
    				this._userTurn = true;
    				if(num === this._moveNumber) {
    					this.incrementMoveNumber();
    				}
    			}, 700)
    		}
    	}, 800)
    }

   	errorSound() {
    	var error = this._board.error;
      	setTimeout(() => {
      		this._view.renderPanel(error);  
      	}, 800);     
    }

    wrongMove(color) {
    	if(color !== this._board.sequence[this._moveTracker - 1].color) {
      		return true;
    	}
    	return false
    }

    rightMove() {
    	if(this._moveNumber === this._moveTracker) {
      		return true;
    	}
    	return false;
  	}

    lastMove() {
    	if(this._moveNumber === this._board.sequence.length) {
      		return true;
    	}
    	return false;
  	}

  	victory() {
	    const sequence = this._board.sequence;
	    let counter = 0;
	    const interval = setInterval(() => {
	    	let panel = sequence[counter];
	    	this._view.renderPanel(panel);
	    	counter++; 
	    	if(counter === sequence.length) {
	    		clearInterval(interval);
	      	}
	    }, 200)
  	}

	userMove(color) {
		if(this._gameOn && this._userTurn) {
			var panel = this._board.panels[color];
			this._view.renderPanel(panel);
			this._moveTracker++;
			

			if(this.wrongMove(color) && !this._strict) {
				this._userTurn = false;
				this.errorSound();
				setTimeout(() => {
					this.replay(this._moveNumber - 1)
				}, 1200)
				this._moveTracker = 0;
			}

			else if(this.wrongMove(color) && this._strict) {
				this._userTurn = false;
				this.errorSound();
				setTimeout(() => {
					this.restart();
				}, 1200);
			}

			else if(this.rightMove() && !this.lastMove()) {
				this._userTurn = false;
				this.replay(this._moveNumber);
				this._moveTracker = 0;
			}

			else if(this.rightMove() && this.lastMove()) {
				this._userTurn = false;
				setTimeout(() => {
					this.victory();
				}, 500);
			}
		}	
	}

	restart() {
    	this.resetSwitches();
   	 	this._view.renderDisplay(0);
   		this._board = new Board();
   		this.replay(0);
    }

    strictMode() {
    	this._strict = !this._strict
    	this._view.renderStrict(this._strict);
  	}
  
}


