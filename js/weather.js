//var APIKEY = '794ae7c93cde1a156390347a55da602c2faffd24';
var APIKEY = '061f24cf3cde2f60644a8240302983f2';

var url = 'http://api.openweathermap.org/data/2.5/weather?'
var cb = "&callback=JSON_CALLBACK";


var lat = 50.848921, lon = 4.351484; //Brussel
var temp = 0, loc = '';

$(document).ready(function() {
	getLocation();
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
	var locationUrl = url + 'lat=' + window.lat + '&lon=' + window.lon + '&APPID=' + APIKEY;
	$.getJSON(locationUrl, function(laWeer){
		var iconUrl = 'http://openweathermap.org/img/w/' + laWeer.weather[0].icon + '.png';
		temp = Math.round((laWeer.main.temp - 273)*100)/100;
		loc = laWeer.name;
			
		var tempHtml = $('#temperature');
		var imgWeather = $('#icon');
		var appWeather = $('#weather-block');
		
		tempHtml.html(
			'<p id="temp">' + '<img src="' + iconUrl + '">' + temp + '°C in '+ loc + '</p>'
		);
		//imgWeather.html('<img src="' + iconUrl + '">')
		
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
	});
}