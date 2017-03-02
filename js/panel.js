function Panel(color, num) {
	'use strict';

	this.color = color;
	this.audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${num}.mp3`)
}