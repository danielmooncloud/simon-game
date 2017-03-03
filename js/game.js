function Game() {
	'use strict';

	var board = new Board();
	var gameOn = false;
	var userTurn = false;
	// moveNumber counts what move the game is on
	var moveNumber = 0;
	//moveTracker counts how many panels you've clicked on your turn
	var moveTracker = 0;
	var strict = false;
	var self = this;

	var incrementMoveNumber = function() {
		moveNumber++;
		gui.renderDisplay(moveNumber);
	}

	var resetSwitches = function() {
		gameOn = true;
		userTurn = false;
		moveNumber = moveTracker = 0;
	}

	var replay = function(num) {
    	var counter = 0;
    	var interval = setInterval(function() {
    		var panel = board.getSequence()[counter];
    		gui.renderPanel(panel);
    		counter++;
    		if(counter > num) {
    			clearInterval(interval);
    			setTimeout(function() {
    				userTurn = true;
    				if(num === moveNumber) {
    					incrementMoveNumber();
    				}
    			}, 700)
    		}
    	}, 800)
    }

   	var errorSound = function() {
    	var error = board.getError();
      	setTimeout(function() {
      		gui.renderPanel(error);  
      	}, 800);     
    }

    var wrongMove = function(color) {
    	if(color !== board.getSequence()[moveTracker - 1].getColor()) {
      		return true;
    	}
    	return false
    }

    var rightMove = function() {
    	if(moveNumber === moveTracker) {
      		return true;
    	}
    	return false;
  	}

    var lastMove = function() {
    	if(moveNumber === 20) {
      		return true;
    	}
    	return false;
  	}

  	var victory = function() {
	    var sequence = board.getSequence();
	    var counter = 0;
	    var interval = setInterval(function() {
	    	var panel = sequence[counter];
	    	view.renderPanel(panel);
	    	counter++; 
	    	if(counter === 19) {
	    		clearInterval(interval);
	      	}
	    }, 200)
  	}

	this.userMove = function(color) {
		if(gameOn && userTurn) {
			var panel = board.getPanels()[color];
			gui.renderPanel(panel);
			moveTracker++;
			

			if(wrongMove(color) && !strict) {
				userTurn = false;
				errorSound();
				setTimeout(function() {
					replay(moveNumber - 1)
				}, 1200)
				moveTracker = 0;
			}

			else if(wrongMove(color) && strict) {
				userTurn = false;
				errorSound();
				setTimeout(function() {
					self.restart();
				}, 1200);
			}

			else if(rightMove() && !lastMove()) {
				userTurn = false;
				replay(moveNumber);
				moveTracker = 0;
			}

			else if(rightMove() && lastMove()) {
				userTurn = false;
				victory();
			}
		}	
	}

	this.restart = function() {
    	resetSwitches();
   	 	gui.renderDisplay(0);
   		board.setSequence();
   		replay(0);
    }

    this.strictMode = function() {
    	strict = !strict
    	gui.renderStrict(strict);
  	}

    
}


