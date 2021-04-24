/* ========= INFORMATION ============================
	- document:  Fake Notifications - creating effective herd effects
	- author:    Wow-Company @ Codecanyon
	- profile:   https://codecanyon.net/user/wow-company
	- version:   1.1
	- email:     wow@wow-company.com
==================================================== */
(function ($) {
	"use strict";
	$.fn.Notification = function (options) {		
		// Settings
		var settings = $.extend({
			Varible1: ["Dima"," Vasya"," Petya"],
			Varible2: ["New York"," Zhitomir"," Zaporozhie"],
                        Varible3: ["30s","15s","23p"],
			Amount: [100, 2500],
			Content: '[Varible1] from [Varible2]<br> has just placed an order for $[Amount].<br>[Varible3]',
			Show: ['stable', 5, 25],
			Close: 5,
			Time: [0, 23],
			LocationTop: [true, '10%'],
			LocationBottom:[false, '10%'],
			LocationRight: [true, '10%'],						
			LocationLeft:[false, '10%'],
			Background: 'black',
			BorderRadius: 5,
			BorderWidth: 1,
			BorderColor: 'red',
			TextColor: 'white',
			IconColor: 'white',		
			AnimationEffectOpen: 'fadeIn',
			AnimationEffectClose: 'fadeOut',
			Number: 3,
			Link: [false, 'https://codecanyon.net/user/wow-company/portfolio', '_blank']
		}, options);
		return this.each(function () {
			var self = this;
			var number = 0;
			var currenttime = new Date();
			var currenthours = currenttime.getHours();
			if(settings.Time[0] <= currenthours && currenthours <= settings.Time[1]){
				openNotification();
			}
			styleNotification();
			// Notification styling						
			function styleNotification() {	
				$(self).addClass('animated');							
				if (settings.LocationTop[0] == true){
					if (settings.LocationRight[0] == true){
						$(self).css({
							'top' : settings.LocationTop[1],
							'right' : settings.LocationRight[1],									
						})
					}
					else{
						$(self).css({
							'top' : settings.LocationTop[1],
							'left' : settings.LocationLeft[1],									
						})
					}
				}
				else {
					if (settings.LocationRight[0] == true){
						$(self).css({
							'bottom' : settings.LocationTop[1],
							'right' : settings.LocationRight[1],									
						})
					}
					else{
						$(self).css({
							'bottom' : settings.LocationTop[1],
							'left' : settings.LocationLeft[1],									
						})
					}
				}
				$(self).css({
					'border-radius' : settings.BorderRadius+'px',
					'border-width' : settings.BorderWidth+'px',
					'border-color' : settings.BorderColor, 
					'background' : settings.Background
				})
				$(self).find('.notification-img').css({
					'color' : settings.IconColor
				})
				$(self).find('.notification-text-block').css({
					'color' : settings.TextColor
				})
				if(settings.Link[0] == true){
					$(self).attr("onclick","window.open('"+settings.Link[1]+"','"+settings.Link[2]+"');");
					$(self).css({'cursor' : 'pointer'});
				}
			};
			function openNotification() {						
				if (settings.Show[0] == 'stable'){
					var open = settings.Show[1] * 1000;
				}
				else {
					var open = (Math.floor(Math.random() * (settings.Show[2] - settings.Show[1])) + settings.Show[1]) * 1000;
				}								
				setTimeout(function(){
					removeEffectClassClose();
					$(self).show();								
					addEffectClassOpen();
					var rand_heard_name = Math.floor(Math.random() * settings.Varible1.length);
					var rand_heard_city = Math.floor(Math.random() * settings.Varible2.length);
                                        var rand_heard_times = Math.floor(Math.random() * settings.Varible3.length);
					var rand_heard_number = Math.floor(Math.random() * (settings.Amount[0] - settings.Amount[1])) + settings.Amount[1];										
					if(settings.Content.indexOf('[Varible1]') + 1) {
						var content = settings.Content.replace("[Varible1]", settings.Varible1[rand_heard_name]);
					}
					else {
						var content = settings.Content.replace("[Varible1]", settings.Varible1[rand_heard_name]);
					}
					if(content.indexOf('[Varible2]') + 1) {
						var content = content.replace("[Varible2]", settings.Varible2[rand_heard_city]);
					}
					else {
						var content = content.replace("[Varible2]", settings.Varible2[rand_heard_city]);
					}
                                        if(content.indexOf('[Varible3]') + 1) {
						var content = content.replace("[Varible3]", settings.Varible3[rand_heard_times]);
					}
					else {
						var content = content.replace("[Varible3]", settings.Varible3[rand_heard_times]);
					}		
					var content = content.replace("[Amount]", rand_heard_number);
					$(self).find('.notification-text').html(content);
					number++;
					closeNotification();								
				}, open);
			}
			function closeNotification() {
				var close = settings.Close * 1000;
				setTimeout(function(){
					removeEffectClassOpen();
					addEffectClassClose();
					if(number < settings.Number){
						openNotification();
					}
				}, close); 
			}
			// Add open effect class
			function addEffectClassOpen() {
				$(self).addClass(settings.AnimationEffectOpen)
			}
			// Remove open effect class
			function removeEffectClassOpen() {
				$(self).removeClass(settings.AnimationEffectOpen)
			}
			// Add close effect class
			function addEffectClassClose() {
				$(self).addClass(settings.AnimationEffectClose)
			}
			// Remove close effect class
			function removeEffectClassClose() {
				$(self).removeClass(settings.AnimationEffectClose)
			}
		});
	}
}(jQuery));