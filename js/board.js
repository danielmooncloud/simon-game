function Board() {
	'use strict';

	var colors = ["red", "green", "yellow", "blue"]
	var self = this
	var sequence = [];
	var panels = {};

	this.setPanels = function() {
		colors.forEach(function(color, i) {
			panels[color] = new Panel(color, i + 1)
		});

		panels["error"] = {
			color: "error",
			audio: new Audio("http://www.soundjay.com/misc/fail-buzzer-01.wav")	
		}
	}

	this.setPanels();

	this.getPanels = function() {
		return panels;
	}

	
	this.setSequence = function() {	
		for(var i = 0; i < 20; i++) {
			var random = Math.floor(Math.random() * 4);
			var color = colors[random];
			sequence[i] = new Panel(color, random + 1)
		}
	};
	
	this.setSequence();

	this.getSequence = function() {
		return sequence;
	}

}