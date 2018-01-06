import pubSub from "./pubsub";

export default class View {

	constructor() {
		this.cacheDom();
		this.bindEvents();
	}
	
	cacheDom() {
		this.$main = $(".main");
		this.$display = this.$main.find(".display");
		this.$light = this.$main.find(".light");
	}

	bindEvents() {
		pubSub.subscribe("updatePanel", panel => {
			this.renderPanel(panel);
		});
		pubSub.subscribe("updateDisplay", num => {
			this.renderDisplay(num);
		});
		pubSub.subscribe("updateStrict", strict => {
			this.renderStrict(strict);
		});
	}
	
	renderPanel(panel) {
		const $panelColor = $("#" + panel.color);
		panel.audio.play();
		$panelColor.addClass("activated");
		setTimeout(() => $panelColor.removeClass("activated"), 300);
	}

	renderDisplay(num) {
		this.$display.html("<h2>" + num + "</h2>");
	}

	renderStrict(strict) {
		strict ? this.$light.addClass("redbutton") : this.$light.removeClass("redbutton");
	}
	
}






