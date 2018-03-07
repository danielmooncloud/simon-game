class Panel {
	constructor(color, num) {
		this.color = color;
		this.audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${num}.mp3`);
	}
}


class ErrorPanel {
	constructor() {
		this.audio = new Audio("http://www.soundjay.com/misc/fail-buzzer-01.wav");
	}
}

export {Panel, ErrorPanel};