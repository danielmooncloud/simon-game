(function() {
'use strict';

var model = {
	sequence: [],
	panels: {
		red: {
		name: 'red',
		audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
			},		
		
		green:  {
		name: 'green',
		audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
			},
		
		yellow:   {
		name: 'yellow',
		audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
			},
		
		blue:  {
		name: 'blue',
		audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
			},
		
		error: {
		name: 'error',
		audio: new Audio("http://www.soundjay.com/misc/fail-buzzer-01.wav")
			}
	}, 
	getPanels: function() {
		return this.panels;
	},
	genSequence: function() {
		var colors = ['green', 'red', 'yellow', 'blue'];
		this.sequence = [];
		for(var i = 0; i < 20; i++) {
			var random = Math.floor(Math.random() * (colors.length - 1));
			this.sequence.push(colors[random]);
		}
	},
	getSequence: function() {
		return this.sequence;
	}

}


var controller = {
  
  init: function() {
    view.init();
   },
    gameOn: false,
    userTurn: false,
    moveNumber: 0,
    moveTracker: 0,
    strict: false,
   
  incrementMoveNumber: function() {
    this.moveNumber++;
    view.renderDisplay(this.moveNumber);
   },
   
  userMove: function(color) { 	
    if(this.gameOn) {
      if(this.userTurn) {
       	var audio = model.getPanels()[color].audio;
       	view.renderPanel(color, audio);
       	this.moveTracker++;
      
        if(color !== model.getSequence()[this.moveTracker - 1] && !this.strict) {
          this.userTurn = false;
       		this.wrongPanel();
          setTimeout(function() {
           controller.replay(controller.moveNumber - 1); 
          }, 1200) 
          this.moveTracker = 0;
          }

        else if(color !== model.getSequence()[this.moveTracker - 1] && this.strict) {
          this.wrongPanel();
          setTimeout(function() {
            controller.restart();
          }, 1200);     
          }
      
        else if(this.moveNumber === this.moveTracker && this.moveNumber !== 20) {
          this.userTurn = false;
          this.replay(this.moveNumber);
          this.moveTracker = 0;

          }

        else if(this.moveNumber === this.moveTracker && this.moveNumber === 20) {
            this.victory(20);
          }
        }
      } 
    },
  
  resetSwitches: function() {
    this.gameOn = true;
    this.userTurn = false;
    this.moveNumber = 0;
    this.moveTracker = 0;
   },
   
  restart: function() {
    this.resetSwitches();
    view.renderDisplay(0);
   	model.genSequence();
   	this.replay(0);
   },

  replay: function(num) {
   	var sequence = model.getSequence();
   	var counter = 0;
   	var interval = setInterval(function() {
   		var panelColor = sequence[counter];
   		var audio = model.getPanels()[panelColor].audio;
   		view.renderPanel(panelColor, audio);
   		counter++; 
      if(counter > num) {
        clearInterval(interval);
        setTimeout(function() {
          controller.userTurn = true;
          if(num === controller.moveNumber) {
            controller.incrementMoveNumber();
          }
        }, 700);  
      }
   	}, 800);
   },
  
  strictMode: function() {
    if(!this.strict) {
      this.strict = true;
      view.renderStrict();
    }
    else if(this.strict) {
      this.strict = false;
      view.renderNormal();
    }
   },
  
  wrongPanel: function() {
    var audio = model.getPanels().error.audio;
      setTimeout(function() {
      view.renderError(audio);  
      }, 800);     
    },

  victory: function(num) {
    var sequence = model.getSequence();
    var counter = 0;
    var interval = setInterval(function() {
      var panelColor = sequence[counter];
      var audio = model.getPanels()[panelColor].audio;
      view.renderPanel(panelColor, audio);
      counter++; 
      if(counter === (num - 1)) {
        clearInterval(interval);
      }
    }, 200)
  }
}


var view = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$panel = $('.col-xs-6');
    this.$start = $('.start');
    this.$strict = $('.strict');
    this.$display = $('.display');
    this.$light = $('.light');
  },
  bindEvents: function() {
    this.$panel.click(function() {
    	view.handlePanel.call(this)
    });
    this.$start.click(function() {
    	view.handleStart();
    });
    this.$strict.click(function() {
    	view.handleStrict();
    })
  },
  handlePanel: function() {
  	var $id = $(this).attr('id');
  	controller.userMove($id);
  },
  handleStart: function() {
  	controller.restart();
  },
  handleStrict: function() {
    controller.strictMode();
  },
  renderPanel: function(colorId, sound) {
  	var $colorId = $('#' + colorId);
  	sound.play();
  	$colorId.addClass('activated');
  	setTimeout(function() {
  		$colorId.removeClass('activated');
  	}, 300) 		
  },
  renderDisplay: function(text) {
  	this.$display.html('<h2>' + text + '</h2>');
  },
  renderError: function(sound) {
  	sound.play();
  },
  renderStrict: function() {
    this.$light.addClass('redbutton');
  },
  renderNormal: function() {
    this.$light.removeClass('redbutton');
  }
}

$(document).ready(function() {

controller.init();
});

})();

