/// <reference path="jquery-3.2.1.js" />

/*
 * First Visit Popup jQuery Plugin version 1.2
 * Chris Cook - chris@chris-cook.co.uk
 */

(function ($) {

	'use strict';//implies variables declaration 

	$.fn.firstVisitPopup = function (settings) {

		var $body = $('body');
		var $dialog = $(this);
		var $blackout;
		var setCookie = function (name, value) {
			var date = new Date(),
				expires = 'expires=';
			date.setTime(date.getTime() + 31536000000);//expiration time for stored cookie
			expires += date.toGMTString();
			document.cookie = name + '=' + value + '; ' + expires + '; path=/';
		}
		var getCookie = function (name) { //get cookie if present otherwise return false
			var allCookies = document.cookie.split(';'),
				cookieCounter = 0,
				currentCookie = '';
			for (cookieCounter = 0; cookieCounter < allCookies.length; cookieCounter++) {
				currentCookie = allCookies[cookieCounter];
				while (currentCookie.charAt(0) === ' ') {
					currentCookie = currentCookie.substring(1, currentCookie.length);
				}
				if (currentCookie.indexOf(name + '=') === 0) {
					return currentCookie.substring(name.length + 1, currentCookie.length);
				}
			}
			return false;
		}
		var showMessage = function () {
			$blackout.show();
			$dialog.show();
		}
		var hideMessage = function () {
			$blackout.hide();
			$dialog.hide();
			setCookie('fvpp' + settings.cookieName, 'true');
		}

		$body.append('<div id="fvpp-blackout"></div>');
		$dialog.append('<a id="fvpp-close">&#10006;</a>');
		$blackout = $('#fvpp-blackout');

		if (getCookie('fvpp' + settings.cookieName)) { //this is the cookie name stored when users visits for first time and seen in the storage of developer tool
			hideMessage();
		} else {
			showMessage();
		}

		$(settings.showAgainSelector).on('click', showMessage);
		$body.on('click', '#fvpp-blackout, #fvpp-close,#btnNoThanks,#btnViewNow', hideMessage);
	};

})(jQuery);





