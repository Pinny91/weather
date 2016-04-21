//var APIKEY = '794ae7c93cde1a156390347a55da602c2faffd24';
var APIKEY = '061f24cf3cde2f60644a8240302983f2';

var url = 'http://api.openweathermap.org/data/2.5/weather?'

var result = null; //DATA VAN HET WEER
var iconUrl = "";



var lat = 50.848921, lon = 4.351484; //Brussel
var temp = 0, loc = '';

$(document).ready(function() {
	getWeather();	
});	

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			window.lat = position.coords.latitude;
			window.lon = position.coords.longitude;
		});
	}
}

function getWeather() {
	getLocation();
	var locationUrl = url + 'lat=' + window.lat + '&lon=' + window.lon + '&APPID=' + APIKEY;
	$.getJSON(locationUrl, function(data) {
		changeHTML(data);
		console.log( "success" );
	})
}

function changeHTML(laWeer){
		window.iconUrl = 'http://openweathermap.org/img/w/' + laWeer.weather[0].icon + '.png';
		window.temp = Math.round((laWeer.main.temp - 273)*100)/100;
		window.loc = laWeer.name;
		
		conversionCF();
		//imgWeather.html('<img src="' + iconUrl + '">')
			
			var tempHtml = $('#temperature');
			var imgWeather = $('#icon');
			var appWeather = $('#weather-block');
			var conversion = $('#convert');
	
		tempHtml.html(
			'<p>' + '<img src="' + iconUrl + '">' + '<i id="temp">' + window.temp + '°C </i> in '+ loc + '</p>'
		);
		if(laWeer.weather[0].id > 900) appWeather.css('background-color', '#161A44');
		else if(laWeer.weather[0].id == 800) appWeather.css('background-color', '#E5FD00');
		else if(laWeer.weather[0].id == 801 ) appWeather.css('background-color', '#DDF35A');
		else if(laWeer.weather[0].id == 802 ) appWeather.css('background-color', '#F3F7AF');
		else if(laWeer.weather[0].id == 803 ) appWeather.css('background-color', '#F3F7AF');
		else if(laWeer.weather[0].id == 804 ) appWeather.css('background-color', '#BEBFA8');
		else if(laWeer.weather[0].id >= 700 &&  laWeer.weather[0].id < 782) appWeather.css('background-color', '#758286');
		else if(laWeer.weather[0].id >= 600 &&  laWeer.weather[0].id < 623) appWeather.css('background-color', '#C6CFD2');
		else if(laWeer.weather[0].id >= 503 &&  laWeer.weather[0].id < 532) appWeather.css('background-color', '#1A3D7B');
		else if(laWeer.weather[0].id > 502) appWeather.css('background-color', '#3967B7');
		else if(laWeer.weather[0].id > 501) appWeather.css('background-color', '#4879CE');
		else if(laWeer.weather[0].id == 500) appWeather.css('background-color', '#2265DA');
		else appWeather.css('background-color', '#0CB90F');	
}

function conversionCF() {
	var conversion = $('#convert');
	conversion.on('click' ,function(){
			var tempChange = $('#temp');
			if(conversion.hasClass('cel')) {
				window.temp = temp * 9 / 5 + 32;
				conversion.addClass('far');
				conversion.removeClass('cel');
				tempChange.html(window.temp + '°F');
			} else { 
				window.temp = (temp-32) / 9 * 5;
				conversion.addClass('cel');
				conversion.removeClass('far');
				tempChange.html(window.temp + '°C');
			}
	console.log(temp);
	});
}