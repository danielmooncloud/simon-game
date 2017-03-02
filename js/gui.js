'use strict';

var gui = {

	init: function() {
		this.cacheDom();
		this.bindEvents();
	},
	
	cacheDom: function() {
		this.$main = $('.main');
		this.$panel = this.$main.find('.col-xs-6');
	    this.$start = this.$main.find('.start');
	    this.$strict = this.$main.find('.strict');
	    this.$display = this.$main.find('.display');
	    this.$light = this.$main.find('.light');
	},
	
	bindEvents: function() {
		this.$panel.click(function() {
			gui.handelPanel.call(this);
		});
		this.$start.click(function() {
    		gui.handleStart();
    	});
    	this.$strict.click(function() {
    		gui.handleStrict();
    	});
	},

	handelPanel: function() {
		var $id = $(this).attr("id")
		game.userMove($id)
	},

	handleStart: function() {
		game.restart();
	},

	handleStrict: function() {
		game.strictMode();
	},

	renderPanel: function(panel) {
		var $panelColor = $('#' + panel.getColor());
		panel.getAudio().play();
		$panelColor.addClass('activated');
		setTimeout(function() {
			$panelColor.removeClass('activated');
		}, 300)
	},

	renderDisplay: function(text) {
  		this.$display.html('<h2>' + text + '</h2>');
  	},

  	renderStrict: function(bool) {
    	if(bool) this.$light.addClass('redbutton')
    	else this.$light.removeClass('redbutton');
  	}
	
}


