import { Panel, ErrorPanel } from "./panel"; 



export default class Board {
	constructor() {
		this.colors = ["red", "green", "yellow", "blue"];
		this.sequence = [];
		this.panels = {};
		this.error = new ErrorPanel();
		this.colors.forEach((color, i) => {
			this.panels[color] = new Panel(color, i + 1);
		});
		let random, color;
		for(let i = 0; i < 20; i++) {
			random = Math.floor(Math.random() * 4);
			color = this.colors[random];
			this.sequence[i] = new Panel(color, random + 1);
		}
	}
}