//create an object for storing the functions & variables to use the API
//get an API key to access the data
let weather = {
  apiKey: "YOUR API KEY HERE",
  //create a function to fetch data from the source
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  //create a function to display chosen data
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const { speed, deg } = data.wind;
    const { sunrise, sunset } = data.sys;
    document.querySelector(".city").innerText = "Current weather in " + name;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".feels_like").innerText =
      "Feels like: " + feels_like + "°F";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".speed").innerText =
      "Wind speed: " + speed + " mph";
    document.querySelector(".deg").innerText =
      "Wind direction: " + deg + " degrees";
    document.querySelector(".sunrise").innerText =
      "Sunrise: " + sunrise + " am";
    document.querySelector(".sunset").innerText = "Sunset: " + sunset + " pm";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  //search bar function
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
//to make the search bar work by clicking the magnifying glass
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
//to make the search bar work by pressing the enter key (keyup)
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Annapolis");
