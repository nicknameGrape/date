//requirejs(["fitText", "fitImage", "HatDraw", "Loader"], function (fitText, fitImage, HatDraw, Loader) {
import fitText from "./js_modules/fitText.mjs";
import fitImage from "./js_modules/fitImage.mjs";
import HatDraw from "./js_modules/HatDraw.mjs";
import Loader from "./js_modules/Loader.mjs";

function drawDate() {
	today = Date.now();
	time = dateFormat(today, "h:MM TT");
	//dateFormat(today, "h:MM TT, dddd, mmmm dS, yyyy");
	divTime.innerHTML = time;
	divDayE.innerHTML = day;
	divDayJ.innerHTML = TRANSLATIONS[day];
	divDateE.innerHTML = "<span>"+month+" <span>"+dateString.slice(0,2)+"<sup>"+dateString.slice(2,4)+"</sup></span></span>";
	divDateJ.innerHTML = TRANSLATIONS[month]+dateNumber+"日";
	divYear.innerHTML = year;
	divSeasonE.innerHTML = season;
	divSeasonJ.innerHTML = TRANSLATIONS[season];
	sunny.nextElementSibling.innerHTML = "sunny";
	cloudy.nextElementSibling.innerHTML = "cloudy";
	rainy.nextElementSibling.innerHTML = "rainy";
	snowy.nextElementSibling.innerHTML = "snowy";
	windy.nextElementSibling.innerHTML = "windy";
	stormy.nextElementSibling.innerHTML = "stormy";
	hot.nextElementSibling.innerHTML = "hot";
	cold.nextElementSibling.innerHTML = "cold";
	context.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
	if (sunny.checked) {
		fitImage(context, weather.sunny.img);
	}
	if (cloudy.checked) {
		fitImage(context, weather.cloudy.img);
	}
	if (rainy.checked) {
		fitImage(context, weather.cloudy.img);
		fitImage(context, weather.rainy.img);
	}
	if (stormy.checked) {
		fitImage(context, weather.stormy.img);
		fitImage(context, weather.cloudy.img);
	}
	if (windy.checked) {
		fitImage(context, weather.windy.img);
	}
	if (hot.checked) {
		fitImage(context, weather.hot.img);
	}
	if (cold.checked) {
		fitImage(context, weather.cold.img);
	}
	if (snowy.checked) {
		fitImage(context, weather.cloudy.img);
		fitImage(context, weather.snowy.img);
	}
	if (rainy.checked) {
		fitImage(context, weather.rainy.img);
	}
}

function updateTime() {
	today = Date.now();
	time = dateFormat(today, "h:MM TT");
	//dateFormat(today, "h:MM TT, dddd, mmmm dS, yyyy");
	divTime.innerHTML = time;
}

function resizeHandler(event) {
	//context.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
	weatherCanvas.width = .3*window.innerWidth;
	weatherCanvas.height = .6*window.innerHeight;
	//fitImage(context, weather.sunny.img, "s");
	//fitImage(context, weather.cloudy.img);
	//fitImage(context, weather.rainy.img);
	//fitImage(context, weather.stormy.img);
	//fitImage(context, weather.windy.img);
	//fitImage(context, weather.hot.img, "s");
	//fitImage(context, weather.cold.img, "s");
	//fitImage(context, weather.snowy.img);
	//fitImage(context, weather.rainy.img);
	drawDate();
}

const TRANSLATIONS = {
	"Sunday": "日曜日",
	"Monday": "月曜日",
	"Tuesday": "火曜日",
	"Wednesday": "水曜日",
	"Thursday": "木曜日",
	"Friday": "金曜日",
	"Saturday": "土曜日",
	"January": "1月",
	"February": "2月",
	"March": "3月",
	"April": "4月",
	"May": "5月",
	"June": "6月",
	"July": "7月",
	"August": "8月",
	"September": "9月",
	"October": "10月",
	"November": "11月",
	"December": "12月",
	"winter": "冬",
	"spring": "春",
	"summer": "夏",
	"fall": "秋"
};

const ASSETS = {
	"sunny": "sunny.png",
	"cloudy": "cloudy.png",
	"rainy": "rainy.png",
	"snowy": "snowy.png",
	"windy": "windy.png",
	"stormy": "stormy.png",
	"hot": "hot.png",
	"cold": "cold.png"
}

let today = Date.now();
let time = dateFormat(today, "h:MM TT");
let timeFix = 0;
let day = dateFormat(today, "dddd");
let month = dateFormat(today, "mmmm");
let dateNumber = dateFormat(today, "d");
let dateString = dateFormat(today, "dS");
let year = dateFormat(today, "yyyy");
let monthNumber = parseInt(dateFormat(today, "m"));
let season;
let divWrapper = document.getElementById("wrapper");
let divTime = document.getElementById("time");
let divDayE = document.getElementById("dayE");
let divDayJ = document.getElementById("dayJ");
let divDateE = document.getElementById("dateE");
let divDateJ = document.getElementById("dateJ");
let divYear = document.getElementById("year");
let divSeasonE = document.getElementById("seasonE");
let divSeasonJ = document.getElementById("seasonJ");
let cbSunny = document.getElementById("sunny");
let cbCloudy = document.getElementById("cloudy");
let cbRainy = document.getElementById("rainy");
let cbSnowy = document.getElementById("snowy");
let cbWindy = document.getElementById("windy");
let cbStormy = document.getElementById("stormy");
let cbHot = document.getElementById("hot");
let cbCold = document.getElementById("cold");
let weatherCanvas = document.getElementById("weatherCanvas");
let context = weatherCanvas.getContext("2d");
let loader = new Loader("images/");
let weather = {};

if (
	monthNumber === 12 ||
	monthNumber === 1 ||
	monthNumber === 2
) {
	season = "winter";
} else if (
	monthNumber === 3 ||
	monthNumber === 4 ||
	monthNumber === 5
) {
	season = "spring";
} else if (
	monthNumber === 6 ||
	monthNumber === 7 ||
	monthNumber === 8
) {
	season = "summer";
} else if (
	monthNumber === 9 ||
	monthNumber === 10 ||
	monthNumber === 11
) {
	season = "fall";
}

console.log(time, day, month, dateString, year, monthNumber, season);

Object.entries(ASSETS).forEach(function (pair) {
	weather[pair[0]] = {
		"render": true,
		"img": loader.newImageAsset(pair[1], resizeHandler)
	};
});

window.addEventListener("resize", resizeHandler, false);
sunny.addEventListener("change", drawDate, false);
cloudy.addEventListener("change", drawDate, false);
rainy.addEventListener("change", drawDate, false);
snowy.addEventListener("change", drawDate, false);
windy.addEventListener("change", drawDate, false);
stormy.addEventListener("change", drawDate, false);
hot.addEventListener("change", drawDate, false);
cold.addEventListener("change", drawDate, false);

resizeHandler();
drawDate()
divWrapper.style.display = "grid";
divWrapper.classList.add("start");
setInterval(function () {updateTime();}, 200);
