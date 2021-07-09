const api = {
    key: "a6739088354df2c812b318a59026ba84",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.searchInput');
searchBox.addEventListener(`keypress`, query);

function query(ant) {
   if (ant.keyCode == 13)  {
      
        fetchResults(searchBox.value);
    }
    

    function fetchResults(thaQuery) {
        fetch(`${api.baseurl}weather?q=${thaQuery}&units=metric&appid=${api.key}`)
        .then(weather => {
        console.log(weather);
            return weather.json();
        }).then(results => {
            displayResults(results)
            displayHistory(results)
        });
    }

}

function displayResults(weather) {
    let city = document.querySelector('#location2 .city');
    city.innerText= `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('#location2 .date');
    date.innerText = dateBuilding(today);

    let temp = document.querySelector(`#current2 .temp`);
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

    let weatherElement = document.querySelector(`#current2 .weather`);
    weatherElement.innerText = weather.weather[0].main;

    let willow = document.querySelector(`#current2 .hi-low`);
    willow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilding (d) {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}

function displayHistory (fetchResults) {
 /*let div = document.createElement("div");
let p = document.createElement("p");
let pTemp = document.createElement("pTemp");
let pWeather = document.createElement("pWeather");
let pHiLow = document.createElement("pHiLow");
let pMain = document.createElement("pMain");
let pMain2 = document.createElement("pMain2");

p.innerText = fetchResults.name;
pTemp.innerText = fetchResults.sys.country;
pWeather.innerText= fetchResults.dt;
pHiLow.innerText = fetchResults.weather[0].main;
pMain.innerText = fetchResults.main.temp_min;
pMain2.innerText = fetchResults.main.temp_max;

div.append(p,pTemp,pWeather,pHiLow ,pMain ,pMain2);*/

document.getElementById("history").innerHTML += createHistoryHtml(fetchResults)
}

/*document.getElementById("buttun").addEventListener('click', deleteHistory);*/

function createHistoryHtml(history_result){
    return `
    <main>
    <section class ="location">
    <div class="city">${history_result.name},${history_result.sys.country}</div>
   
    </section>
    <div class = "current">
        <div class ="temp">${Math.round(history_result.main.temp)}<span>°c</span>
        </div>
        <div class="weather">${history_result.weather[0].main}</div>
        
    </div>
    </main>
    `
}

function reloadPage(){
    window.location= window.location.href;
}

document.querySelector('#location2 .city').addEventListener("mouseover", mouseOver);
document.querySelector('#location2 .city').addEventListener("mouseout", mouseOut);

function mouseOver() {
    this.style.color = "white";
  }
  
  function mouseOut() {
    this.style.color = "black";
  }


document.querySelector('#location2 .date').addEventListener("mouseover", mouseOver);
document.querySelector('#location2 .date').addEventListener("mouseout", mouseOut);




document.querySelector(`#current2 .temp`).addEventListener("mouseover", mouseOver);
document.querySelector(`#current2 .temp`).addEventListener("mouseout", mouseOut);




document.querySelector(`#current2 .weather`).addEventListener("mouseover", mouseOver);
document.querySelector(`#current2 .weather`).addEventListener("mouseout", mouseOut);




document.querySelector(`#current2 .hi-low`).addEventListener("mouseover", mouseOver);
document.querySelector(`#current2 .hi-low`).addEventListener("mouseout", mouseOut);

