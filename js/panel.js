module.exports = function Panel(color, num) {
	'use strict';

	var color = color;
	var audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${num}.mp3`)

	this.getColor = function() {
		return color;
	}

	this.getAudio = function() {
		return audio;
	}
}



module.exports = function Error() {
	'use strict';

	var audio = new Audio("http://www.soundjay.com/misc/fail-buzzer-01.wav");

	this.getColor = function() {
		return "error";
	}

	this.getAudio = function() {
		return audio;
	}
}