//variables
let submit = document.getElementById('submit');
let enteredCity = document.getElementById('enteredCity');

let date = document.getElementById('date');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let feelsLike = document.getElementById('feelsLike');
let sunrise = document.getElementById('sunrise');



let image = document.getElementById('icon');
let temperature = document.getElementById('temperature');
let place = document.getElementById('place');
let description = document.getElementById('description');

let get = () =>{
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enteredCity.value}&appid=ebbf5f1d676d479b2fc1eb8dd318add2`)
	.then(response => response.json())
	.then(data => {

		if(document.querySelector(".next-days")){
			for(let i=0; i<7; i++)
				document.querySelector(".next-days").remove();
		}

		console.log(data);
		if(data.cod===200) 
			document.getElementById('frame').style.display="block";
		else
			document.getElementById('frame').style.display="none";
				
		getDate(); 

		let city = data.name;
		document.getElementById(`embed`).setAttribute(`src`, `icons/${data.weather[0].icon[0]+data.weather[0].icon[1]}.svg`);
		
		let msg = data.weather[0].description;
		description.innerHTML = msg.charAt(0).toUpperCase()+msg.slice(1);
		
		let temperatureValue = Math.round((data.main.temp - 273.15)*10)/10;
		if(Number.isInteger(temperatureValue) === true)
			temperatureValue += ".0";

		temperature.innerHTML = `${temperatureValue}\u00B0C`;
		place.innerHTML = `${city}, ${data.sys.country}`;

		feelsLike.innerHTML = `${Math.round((data.main.feels_like - 273.15)*10)/10} \u00B0C`
		wind.innerHTML = `${Math.round(data.wind.speed*3.6*100)/100} km/h `;
		humidity.innerHTML = `${data.main.humidity} %`;
		pressure.innerHTML = `${data.main.pressure} hPa`;
		sunrise.innerHTML = `${new Date(data.sys.sunrise*1000).toLocaleTimeString()}`;
		sunset.innerHTML = `${new Date(data.sys.sunset*1000).toLocaleTimeString()}`;



		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=ebbf5f1d676d479b2fc1eb8dd318add2`)
		.then(response => response.json())
		.then(data => {
			let now = new Date();
				
			now.setDate(now.getDate() + 8);
			console.log(data);
			for(let i=7; i>=1; i--){
				now.setDate(now.getDate() -1);

				let msg = data.daily[i].weather[0].description;
				
				let day = now.getDate();
				let month = now.getMonth() + 1;
				if (day < 10) {
					day = '0' + day;
				}

				if (month < 10) {
					month = '0' + month;
				}

				let t = Math.round((data.daily[i].temp.day - 273.15) * 10) / 10;
				if(Number.isInteger(t) === true)
					t += ".0";
				
				create(getDay(now.getDay()), day+ '.' + month, data.daily[i].weather[0].icon[0] + data.daily[i].weather[0].icon[1], t, msg.charAt(0).toUpperCase() + msg.slice(1), data.daily[i].pressure, data.daily[i].humidity, new Date(data.daily[i].sunrise * 1000).toLocaleTimeString(), Math.round((data.daily[i].feels_like.day - 273.15) * 10) / 10, Math.round(data.daily[i].wind_speed * 3.6 * 100) / 100, new Date(data.daily[i].sunset * 1000).toLocaleTimeString());}
		})

		.catch(error => alert(`Something went wrong`));
	})
	.catch(error => alert(`Wrong city name`));
}

let getDate = () =>{
	let now = new Date();
	let day = '';
	switch(now.getDay()){
		case 0:
		day = 'Sunday'; break;
		case 1:
		day = 'Monday'; break;
		case 2:
		day = 'Thuesday'; break;
		case 3:
		day = 'Wednesday'; break;
		case 4:
		day = 'Thursday'; break;
		case 5:
		day = 'Friday'; break;
		case 6:
		day = 'Saturday'; break;
	}
	date.innerHTML = day+ ', ' + now.getDate() + '.' + (now.getMonth()+1) + '.' + now.getFullYear();
}

let getDay = (value) => {
	switch (value%7) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Thuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
	}
}



let down = () =>{  //keydown
	// event.preventDefault();
	if(event.keyCode === 13){
		get();
	}
}

//listeners
submit.addEventListener('click', get);
document.addEventListener('keydown', down);


let create = (day, date, icon, temp, description, press, hum, rise, feels, wind, set) =>{
	const sekcja = document.createElement("section");
	sekcja.classList.add('next-days');
	sekcja.classList.add('flex');
	sekcja.classList.add('space-between');

	const whichDay = document.createElement("div");
	whichDay.classList.add('which-day');
	if(day === "Sunday" || day === "Saturday"){
		whichDay.classList.add('if-weekend');
	}

	const nextDay = document.createElement("div");
	nextDay.classList.add('day');
	nextDay.innerHTML = day;

	const nextDate = document.createElement("div");
	nextDate.classList.add('date');
	nextDate.innerHTML = date;

	whichDay.append(nextDay);
	whichDay.append(nextDate);

	sekcja.append(whichDay);


	const divEmbed = document.createElement("div");
	const embed = document.createElement("embed");
	embed.classList.add("embed");
	embed.setAttribute("src", "icons/"+icon+".svg");
	embed.setAttribute("height", "80");
	embed.setAttribute("type", "image/svg+xml");
	divEmbed.append(embed);

	sekcja.append(divEmbed);

	const divTemp = document.createElement("div");
	const nextTemperature = document.createElement("div");
	nextTemperature.classList.add("temperature");
	nextTemperature.innerHTML = temp +" °C";

	const nextDescription = document.createElement("div");
	nextDescription.classList.add("description");
	nextDescription.innerHTML = description;

	divTemp.append(nextTemperature);
	divTemp.append(nextDescription);

	sekcja.append(divTemp);


	const nextDivDetails = document.createElement("div");
	nextDivDetails.classList.add("m-top10");
	nextDivDetails.classList.add("m-right10");
	nextDivDetails.classList.add("next-details");

	const nextDetails1 = document.createElement("div");
	nextDetails1.classList.add('details');
	nextDetails1.classList.add('flex');
	nextDetails1.classList.add('space-between');

	let tempP = document.createElement("div");
	const nextPressure = document.createElement("div");
	nextPressure.innerHTML = "PRESSURE";
	tempP.innerHTML = press+" hPa";
	nextPressure.append(tempP);
	nextDetails1.append(nextPressure);

	let tempH = document.createElement("div");
	const nextHumidity = document.createElement("div");
	nextHumidity.innerHTML = "HUMIDITY";
	tempH.innerHTML = hum+" %";
	nextHumidity.append(tempH);
	nextDetails1.append(nextHumidity);

	let tempSr = document.createElement("div");
	const nextSunrise = document.createElement("div");
	nextSunrise.innerHTML = "SUNRISE";
	tempSr.innerHTML = rise;
	nextSunrise.append(tempSr);
	nextDetails1.append(nextSunrise);


	const nextDetails2 = document.createElement("div");
	nextDetails2.classList.add('details');
	nextDetails2.classList.add('flex');
	nextDetails2.classList.add('space-between');

	let tempF = document.createElement("div");
	const nextFeelsLike = document.createElement("div");
	nextFeelsLike.innerHTML = "FEELS LIKE";
	tempF.innerHTML = feels+" °C";
	nextFeelsLike.append(tempF);
	nextDetails2.append(nextFeelsLike);

	let tempW = document.createElement("div");
	const nextWind = document.createElement("div");
	nextWind.innerHTML = "WIND";
	tempW.innerHTML = wind+" km/h";
	nextWind.append(tempW);
	nextDetails2.append(nextWind);

	let tempSs = document.createElement("div");
	const nextSunset = document.createElement("div");
	nextSunset.innerHTML = "SUNSET";
	tempSs.innerHTML = set;
	nextSunset.append(tempSs);
	nextDetails2.append(nextSunset);


	nextDivDetails.append(nextDetails1);
	nextDivDetails.append(nextDetails2);
	sekcja.append(nextDivDetails);


	let div = document.querySelector("main"); //do tego elementu wstawię nowy element
	div.after(sekcja);
}

