class Panel {
	constructor(color, num) {
		this._color = color;
		this._audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${num}.mp3`)
	}

	get color () {
		return this._color;
	}

	get audio() {
		return this._audio;
	}
}


class ErrorPanel {
	constructor() {
		this._audio = new Audio("http://www.soundjay.com/misc/fail-buzzer-01.wav")
	}

	get color() {
		return "error";
	}

	get audio() {
		return this._audio;
	}
}

export {Panel, ErrorPanel}