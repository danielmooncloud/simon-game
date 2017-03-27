import "../scss/application.scss";
import Game from "./game";

$(document).ready(function() {

	const gui = {

		init() {
			this.cacheDom();
			this.bindEvents();
		},
		
		cacheDom() {
			this.$main = $(".main");
			this.$panel = this.$main.find(".col-xs-6");
			this.$start = this.$main.find(".start");
			this.$strict = this.$main.find(".strict");
			this.$display = this.$main.find(".display");
			this.$light = this.$main.find(".light");
		},
		
		bindEvents() {
			this.$panel.click(function() {
				const $id = $(this).attr("id");
				game.userMove($id);
			});
			this.$start.click(() => {
				game.restart();
			});
			this.$strict.click(() => {
				game.strictMode();
			});
		},

		renderPanel(panel) {
			const $panelColor = $("#" + panel.color);
			panel.audio.play();
			$panelColor.addClass("activated");
			setTimeout(() => {
				$panelColor.removeClass("activated");
			}, 300);
		},

		renderDisplay(text) {
			this.$display.html("<h2>" + text + "</h2>");
		},

		renderStrict(bool) {
			if(bool) this.$light.addClass("redbutton");
			else this.$light.removeClass("redbutton");
		}
		
	};

	var game = new Game();
	game.init(gui);

});


