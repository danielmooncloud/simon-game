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
		for(let i = 0; i < 20; i++) {
			let random = Math.floor(Math.random() * 4);
			let color = this.colors[random];
			this.sequence[i] = new Panel(color, random + 1);
		}
	}
}