$(document).ready(function(){

var apiUrl, windMph, windKM, tempF, tempC;
var bgUrl = ''; //put path to background images

function getLocation() {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure);
};

function locationSuccess(position){
	$("#location").html("Location found");
	apiUrl = 'https://api.apixu.com/v1/current.json?key=be4767290dfa44c0abc162117162009&q='+ position.coords.latitude + "," + position.coords.longitude;
	console.log(apiUrl);
	updateWeather();
};

function locationFailure(){
	$("#location").html("Error");
};

function updateWeather(data){
	$.getJSON( apiUrl , function(data) {
		console.log(data)
		//variables stored for unit switching
		windMph = data.current.wind_mph;
		windKM = data.current.wind_kph;
		tempF = data.current.temp_f;
		tempC = data.current.temp_c;
		// Basic Text Updates
		$("#location").html(data.location.name + "<br>" + data.location.region);
		$("#text").html(data.current.condition.text);
		$("#windDir").html(data.current.wind_dir + " &nbsp;");
		$("#windSp").html(windMph + " &nbsp;");
		$("#temp").html(tempF);
		//updates both icon and background
		changeIcon(data.current.condition.code, data.current.is_day);
	})
  .done(function() {
    console.log( "success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
};

function changeIcon(code, day){
	switch(code){
		case 1000:
			//clear
			if(day){
				$("#overall").attr("data-icon","B"); //sun
				$("body").css("background-image", "url(pixabay/clearDay.jpg)");
				$(".filter").toggleClass("clearDay");
			} else{
				$("#overall").attr("data-icon","C"); //moon
				$("body").css("background-image", "url(pixabay/clearNight.jpg)");
				$(".filter").toggleClass("clearNight");
			}
			break;
		case 1003:
			//partly cloudy
			if(day){
				$("#overall").attr("data-icon","H");
				$("body").css("background-image", "url(pixabay/partlyCloudy.jpg)");
				$(".filter").toggleClass("partlyCloudy");
			} else{
				$("#overall").attr("data-icon","I");
				$("body").css("background-image", "url(pixabay/cloudyNight.jpg)");
				$(".filter").toggleClass("cloudyNight");
			}
			break;
		case 1006:
			//cloudy
			$("#overall").attr("data-icon","N");
			if(day){
				$("body").css("background-image", "url(pixabay/cloudy.jpg)");
				$(".filter").toggleClass("cloudy");
			} else{
				$("body").css("background-image", "url(pixabay/cloudyNight.jpg)");
				$(".filter").toggleClass("cloudyNight");
			}
			break;
		case 1009:
			//overcast
			$("#overall").attr("data-icon","Y");
			$("body").css("background-image", "url(pixabay/overcast.jpg)");
			$(".filter").toggleClass("overcast");
			break;
		case 1030:
			//mist
		case 1135:
		case 1147:
			//fog
			$("#overall").attr("data-icon","E");
			$("body").css("background-image", "url(pixabay/mist.jpg)");
			$(".filter").toggleClass("mist");
			break;
		case 1063:
		case 1072:
		case 1150:
		case 1153:
		case 1168:
		case 1171:
			//patchy rainy, light drizzle
			$("#overall").attr("data-icon","Q");
			$("body").css("background-image", "url(pixabay/overcast.jpg)");
			$(".filter").toggleClass("overcast");
			break;
		case 1180:
		case 1183:
		case 1186:
		case 1189:
		case 1192:
		case 1195:
		case 1198:
		case 1240:
		case 1201: // heavy rain
		case 1243:
		case 1246:
			//rain
			$("#overall").attr("data-icon","R");
			$("body").css("background-image", "url(pixabay/overcast.jpg)");
			$(".filter").toggleClass("overcast");
			break;
		case 1069:
		case 1204:
		case 1207:
		case 1249:
		case 1252:
			//sleet
			$("#overall").attr("data-icon","X");
			$("body").css("background-image", "url(pixabay/overcast.jpg)");
			$(".filter").toggleClass("overcast");
			break;
		case 1066:
		case 1114:
		case 1210:
		case 1213:
			//lighter snow
			$("#overall").attr("data-icon","V");
			$("body").css("background-image", "url(pixabay/winter.jpg)");
			$(".filter").toggleClass("winter");
			break;
		case 1216:
		case 1219:
		case 1222:
		case 1225:
		case 1237:
		case 1255:
		case 1258:
		case 1261:
		case 1264: 
		//moderate-heavy snow
		case 1117:
		//blizzard
			$("#overall").attr("data-icon","W");
			$("body").css("background-image", "url(pixabay/winter.jpg)");
			$(".filter").toggleClass("winter");
			break;
		case 1087:
		case 1273:
		case 1276:
		case 1279:
		case 1282:
			//thundery
			$("#overall").attr("data-icon","O");
			$("body").css("background-image", "url(pixabay/storm.jpg)");
			$(".filter").toggleClass("storm");
			break;
		default:
			$("#overall").attr("data-icon","M");
			$("body").css("background-image", "url(pixabay/default.jpg)");
			console.log("No matching icon found.");
	}
};

// switches temp unit
$("#row1").on('click', function(){
	if( $("#temp").html() == tempF){
		$("#temp").html(tempC);
		$("#deg").attr("data-icon", "*");
		console.log("Switched temperature to Celcius.");
	} else {
		$("#temp").html(tempF);
		$("#deg").attr("data-icon", "+");
		console.log("Switched temperature to Farenheight.");
	}
});

//switches wind speed unit
$("#row2").on('click', function(){
	if( $("#windSp").html() == windMph + " &nbsp;"){
		$("#windSp").html(windKM + " &nbsp;");
		$("#windUn").html("Kph");
		console.log("Switched windspeed to kilometers.");
	} else {
		$("#windSp").html(windMph + " &nbsp;");
		$("#windUn").html("mph");
		console.log("Switched windspeed to miles per hour.");
	}
});

getLocation();
}); // end document ready.