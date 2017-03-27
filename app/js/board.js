import { Panel, ErrorPanel } from "./panel"; 



export default class Board {
	constructor() {
		this._colors = ["red", "green", "yellow", "blue"];
		this._sequence = [];
		this._panels = {};
		this._error = new ErrorPanel();
		this._colors.forEach((color, i) => {
			this._panels[color] = new Panel(color, i + 1);
		});
		for(let i = 0; i < 20; i++) {
			let random = Math.floor(Math.random() * 4);
			let color = this._colors[random];
			this._sequence[i] = new Panel(color, random + 1);
		}
	}

	get panels() {
		return this._panels;
	}

	get sequence() {
		return this._sequence;
	}

	get error() {
		return this._error;
	}

}