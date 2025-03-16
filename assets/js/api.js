window.onload = function () {
  document.getElementById("loader").classList.add("hidden");
};

let cityInput = document.getElementById("city_input");
let api_key = "5b259a9819578144c3f321ba9f822533";
let currentWeather = document.querySelector(".current-weather.one");
let tenDaysForecastCard = document.querySelector(".forecast-list");
let aqiCard = document.querySelector(".weather-grid");
function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let WEATHER_API_URL = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let WEATHER_API_URL_2 = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  fetch(WEATHER_API_URL_2)
    .then((res) => res.json())
    .then((datapollution) => {
      let sunriseTimestamp = datapollution.sys.sunrise;
      let sunriseTime = new Date(sunriseTimestamp * 1000);
      let hours = sunriseTime.getHours();
      let minutes = sunriseTime.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      let sunsetTimestamp = datapollution.sys.sunset;
      let sunsetTime = new Date(sunsetTimestamp * 1000);
      let sunsetHours = sunsetTime.getHours();
      let sunsetMinutes = sunsetTime.getMinutes();
      let sunsetAmPm = sunsetHours >= 12 ? "PM" : "AM";
      sunsetHours = sunsetHours % 12 || 12;
      aqiCard.innerHTML = `
    <div class="weather-card">
       <div class="status">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M3 8H9.5C9.99445 8 10.4778 7.85338 10.8889 7.57867C11.3 7.30397 11.6205 6.91352 11.8097 6.45671C11.9989 5.99989 12.0484 5.49723 11.952 5.01228C11.8555 4.52732 11.6174 4.08187 11.2678 3.73223C10.9181 3.3826 10.4727 3.1445 9.98773 3.04804C9.50277 2.95157 9.00011 3.00108 8.54329 3.1903C8.08648 3.37952 7.69603 3.69995 7.42133 4.11108C7.14662 4.5222 7 5.00555 7 5.5V5.857M4 14H18.5C19.1922 14 19.8689 14.2053 20.4445 14.5899C21.0201 14.9744 21.4687 15.5211 21.7336 16.1606C21.9985 16.8002 22.0678 17.5039 21.9327 18.1828C21.7977 18.8618 21.4644 19.4854 20.9749 19.9749C20.4854 20.4644 19.8617 20.7977 19.1828 20.9328C18.5039 21.0678 17.8001 20.9985 17.1606 20.7336C16.5211 20.4687 15.9744 20.0201 15.5899 19.4445C15.2053 18.8689 15 18.1922 15 17.5V17" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
               <path d="M2 11H18.5C19.1922 11 19.8689 10.7947 20.4445 10.4101C21.0201 10.0256 21.4687 9.47893 21.7336 8.83939C21.9985 8.19985 22.0678 7.49612 21.9327 6.81719C21.7977 6.13825 21.4644 5.51461 20.9749 5.02513C20.4854 4.53564 19.8617 4.2023 19.1828 4.06725C18.5039 3.9322 17.8001 4.00152 17.1606 4.26642C16.5211 4.53133 15.9744 4.97993 15.5899 5.55551C15.2053 6.13108 15 6.80777 15 7.5V8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
             </svg>
           <p>Wind Status</p>
       </div>
       <p class="weather-value">${datapollution.wind.speed} km/h</p>
       <p class="weather-time">9:00 AM</p>
   </div>
   <div class="weather-card">
       <div class="status">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M17.607 10.4948L12.6353 2.57775C12.5631 2.47651 12.4678 2.39398 12.3573 2.33703C12.2468 2.28008 12.1243 2.25037 12 2.25037C11.8757 2.25037 11.7532 2.28008 11.6427 2.33703C11.5322 2.39398 11.4369 2.47651 11.3647 2.57775L6.3705 10.533C5.67724 11.6522 5.2908 12.9341 5.25 14.25C5.25 16.0402 5.96116 17.7571 7.22703 19.023C8.4929 20.2888 10.2098 21 12 21C13.7902 21 15.5071 20.2888 16.773 19.023C18.0388 17.7571 18.75 16.0402 18.75 14.25C18.707 12.9193 18.3126 11.6237 17.607 10.4948ZM12 19.5C10.6082 19.498 9.27402 18.9443 8.28988 17.9601C7.30574 16.976 6.75198 15.6418 6.75 14.25C6.79063 13.2013 7.10561 12.1817 7.6635 11.2928L8.36475 10.1753L15.9202 17.7308C15.4294 18.2866 14.8261 18.7318 14.1503 19.037C13.4745 19.3421 12.7415 19.4995 12 19.5Z" fill="white"/>
             </svg>
           <p>Humidity</p>
       </div>
       <p class="weather-value">${datapollution.main.humidity}%</p>
       <p>Humidity is good</p>
   </div>

   <div class="weather-card sun">
       <div class="sun-img">
           <img src="assets/images/Sunrise.png" alt="">
       </div>
       <div class="sun-time">
           <p class="sun-condition">Sunrise</p>
        <p class="weather-value">${hours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}</p>
       </div>
   </div>

   <div class="weather-card">
       <div class="status">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M12 3V4.5M17 13C17 11.6739 16.4732 10.4021 15.5355 9.46447C14.5979 8.52678 13.3261 8 12 8C10.6739 8 9.40215 8.52678 8.46447 9.46447C7.52678 10.4021 7 11.6739 7 13M5.988 6.99L4.928 5.929M22 13H20.5M3.5 13H2M19.07 5.929L18.01 6.989M6.5 16V19C6.5 19.943 6.5 20.414 6.793 20.707C7.086 21 7.557 21 8.5 21C9.443 21 9.914 21 10.207 20.707C10.5 20.414 10.5 19.943 10.5 19V16M13.5 16L15.5 21L17.5 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           <p>UV Index</p>
       </div>
       <p class="weather-value">4 UV</p>
       <p>Moderate UV</p>
   </div>
   <div class="weather-card">
       <div class="status">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.60801 21 2.12201 17.12 1.18201 12C2.12201 6.88 6.60801 3 12 3ZM12 19C14.0396 18.9998 16.0188 18.3071 17.6135 17.0355C19.2081 15.7638 20.3239 13.9884 20.778 12C20.3226 10.0128 19.2065 8.23896 17.612 6.96854C16.0176 5.69813 14.0392 5.00635 12.0005 5.00635C9.96182 5.00635 7.98346 5.69813 6.38901 6.96854C4.79455 8.23896 3.67837 10.0128 3.22301 12C3.6771 13.9883 4.79268 15.7635 6.38715 17.0352C7.98162 18.3068 9.96054 18.9996 12 19ZM12 16.5C10.8065 16.5 9.66194 16.0259 8.81803 15.182C7.97411 14.3381 7.50001 13.1935 7.50001 12C7.50001 10.8065 7.97411 9.66193 8.81803 8.81802C9.66194 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.663 14.5 13.2989 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.2989 9.76339 12.663 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2322 10.2322C9.7634 10.7011 9.50001 11.337 9.50001 12C9.50001 12.663 9.7634 13.2989 10.2322 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z" fill="white"/>
             </svg>
           <p>Visibility</p>
       </div>
       <p class="weather-value">${datapollution.visibility}km</p>
       <p class="weather-time">9:00 AM</p>
   </div>

   <div class="weather-card sun">
       <div class="sun-img">
           <img src="assets/images/Sunset.png" alt="">
       </div>
       <div class="sun-time">
           <p class="sun-condition">Sunset</p>
           <p class="weather-value">${sunsetHours}:${sunsetMinutes.toString().padStart(2, "0")} ${sunsetAmPm}</p>
           </div>
       </div>
       `;
    })
    .catch(() => {
      alert("Failed to fetch Air Quality Index");
    });

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let dataNow = new Date();
      currentWeather.innerHTML = `
                <div class="row">
                    <div class="location-weather">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15.6 10.8C15.6 11.7548 15.2207 12.6705 14.5456 13.3456C13.8705 14.0207 12.9548 14.4 12 14.4C11.0452 14.4 10.1296 14.0207 9.45442 13.3456C8.77929 12.6705 8.40001 11.7548 8.40001 10.8C8.40001 9.84523 8.77929 8.92956 9.45442 8.25443C10.1296 7.5793 11.0452 7.20001 12 7.20001C12.9548 7.20001 13.8705 7.5793 14.5456 8.25443C15.2207 8.92956 15.6 9.84523 15.6 10.8ZM14.4 10.8C14.4 10.1635 14.1472 9.55304 13.6971 9.10295C13.247 8.65287 12.6365 8.40001 12 8.40001C11.3635 8.40001 10.753 8.65287 10.303 9.10295C9.85287 9.55304 9.60001 10.1635 9.60001 10.8C9.60001 11.4365 9.85287 12.047 10.303 12.4971C10.753 12.9472 11.3635 13.2 12 13.2C12.6365 13.2 13.247 12.9472 13.6971 12.4971C14.1472 12.047 14.4 11.4365 14.4 10.8ZM17.94 16.746C19.5155 15.1697 20.4005 13.0323 20.4005 10.8036C20.4005 8.57496 19.5155 6.43752 17.94 4.86121C17.16 4.08111 16.2339 3.46229 15.2147 3.0401C14.1956 2.6179 13.1032 2.4006 12 2.4006C10.8968 2.4006 9.80446 2.6179 8.78527 3.0401C7.76608 3.46229 6.84003 4.08111 6.06001 4.86121C4.48452 6.43752 3.59949 8.57496 3.59949 10.8036C3.59949 13.0323 4.48452 15.1697 6.06001 16.746L7.88521 18.5448L10.3368 20.9268L10.4964 21.0684C11.4264 21.822 12.7884 21.774 13.6644 20.9268L16.5864 18.0828L17.94 16.746ZM6.90601 5.70721C7.5747 5.03778 8.36877 4.50672 9.24284 4.14438C10.1169 3.78205 11.0538 3.59555 12 3.59555C12.9462 3.59555 13.8831 3.78205 14.7572 4.14438C15.6312 4.50672 16.4253 5.03778 17.094 5.70721C18.4071 7.02205 19.1621 8.79299 19.2014 10.6508C19.2407 12.5086 18.5615 14.31 17.3052 15.6792L17.094 15.9L15.5088 17.4648L12.8328 20.0676L12.72 20.1636C12.5122 20.3192 12.2595 20.4032 11.9998 20.403C11.7402 20.4028 11.4876 20.3184 11.28 20.1624L11.1684 20.0664L7.59241 16.5804L6.90601 15.9L6.69481 15.6804C5.43854 14.3112 4.75927 12.5098 4.79862 10.652C4.83796 8.79419 5.59289 7.02205 6.90601 5.70721Z" fill="white"/>
                          </svg>
                          <p id="location">${name}, ${country}</p>
                    </div>
                    <div class="celsius-weather">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 9C20 8.20435 19.6839 7.44129 19.1213 6.87868C18.5587 6.31607 17.7956 6 17 6H16C15.2044 6 14.4413 6.31607 13.8787 6.87868C13.3161 7.44129 13 8.20435 13 9V15C13 15.7956 13.3161 16.5587 13.8787 17.1213C14.4413 17.6839 15.2044 18 16 18H17C17.7956 18 18.5587 17.6839 19.1213 17.1213C19.6839 16.5587 20 15.7956 20 15M4 8C4 8.53043 4.21071 9.03914 4.58579 9.41421C4.96086 9.78929 5.46957 10 6 10C6.53043 10 7.03914 9.78929 7.41421 9.41421C7.78929 9.03914 8 8.53043 8 8C8 7.46957 7.78929 6.96086 7.41421 6.58579C7.03914 6.21071 6.53043 6 6 6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                    </div>
                </div>
                <div class="data-weather">
                    <p class="data-day">${days[dataNow.getDay()]}</p>
                    <p class="data-now">${dataNow
                      .getDate()
                      .toString()
                      .padStart(2, "0")} ${
        months[dataNow.getMonth()]
      }, ${dataNow.getFullYear()}</p>
                </div>
                <div class="cotent-weather">
                    <div class="speace"></div>
                    <div class="img-weather-now">
                        <img src="assets/images/${data.weather[0].icon}.png" width="163px"  loading="lazy" onerror="this.onerror=null; this.src='assets/images/02d.png';">
                    </div>
                    <div class="content-number">
                        <div class="celsius-number">
                            <p id="number-celsius">${Math.trunc(
                              data.main.temp - 273.15
                            )}°C</p>
                            <h6 id="division-celsius">/${Math.trunc(
                              data.main.temp_max - 273.15
                            )}°C</h6>
                        </div>
                        <div class="text-celsius">
                            <p id="condition">${data.weather[0].description}</p>
                            <p id="degrees">Feels like <span>${Math.trunc(
                              data.main.feels_like - 273.15
                            )}°C</span></p>
                        </div>
                    </div>
                </div>


        `;
    })
    .catch(() => {
      alert(`Failed to fetch coordinates of ${cityName}`);
    });
  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list
        .filter((forecast) => {
          let forecastDate = new Date(forecast.dt_txt).getDate();
          let count = uniqueForecastDays.filter(
            (day) => day === forecastDate
          ).length;
          if (count < 2) {
            uniqueForecastDays.push(forecastDate);
            return true;
          }
          return false;
        })
        .slice(0, 10);
      tenDaysForecastCard.innerHTML = "";
      for (i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        tenDaysForecastCard.innerHTML += `
            <div class="forecast-item">
                <div class="day">
                    <p class="day-name">${date.getDate()} ${
          months[date.getMonth()]
        }</p>
                    <div class="border-day"></div>
                </div>
                <img src="assets/images/${
          fiveDaysForecast[i].weather[0].icon
        }.png"  loading="lazy" class="weather-icon" onerror="this.onerror=null; this.src='assets/images/few clouds-02d.png';">
                     <p class="temperature">${Math.trunc(
                       fiveDaysForecast[i].main.temp_max - 273.15
                     )}°C</p>
            </div>
    `;
      }
    })
    .catch(() => {
      alert("Failed to fetch weather");
    });
}

function getCityCoordinates() {
  document.getElementById("loader").classList.remove("hidden"); // إظهار اللودر
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to fetch coordinates of ${cityName}`);
    })
    .finally(() => {
      document.getElementById("loader").classList.add("hidden"); // إخفاء اللودر بعد انتهاء العملية
    });
}

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getCityCoordinates();
  }
});
