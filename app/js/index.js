import "../scss/application.scss";
import Game from "./game";
import View from "./view";


$(document).ready(function() {
	new View();
	new Game();
});