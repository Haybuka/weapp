//grab elements
let wrapper = document.querySelector(".wrapper");
let locationNow = document.querySelector(".js-location-current");
let currentDegree = document.createElement("h1");
let currentDescription = document.createElement("p");
let currentSection = document.createElement("section");
let preloader = document.createElement("div");
//measure section
let water = document.createElement("p");
let waterLevel = document.createElement("p");
let waterDiv = document.createElement("div");
let waterLi = document.createElement("li");
let humidity = document.createElement("p");
let humidityPercent = document.createElement("p");
let humidityDiv = document.createElement("div");
let humidityLi = document.createElement("li");
let speed = document.createElement("p");
let speedMeter = document.createElement("p");
let speedDiv = document.createElement("div");
let speedLi = document.createElement("li");
let measureUl = document.createElement("ul");
let measureAside = document.createElement("aside");
//day range section
let dayOneLi = document.createElement("li");
let dayTwoLi = document.createElement("li");
let dayThreeLi = document.createElement("li");
let dayFourLi = document.createElement("li");
let dayFiveLi = document.createElement("li");
//dayOne element
let dayOneHeader = document.createElement("div");
let dayOneDay = document.createElement("p");
let dayOneDate = document.createElement("p");
let dayOneimg = document.createElement("img");
let dayOneimgDiv = document.createElement("div");
let dayOneDegree = document.createElement("p");
//day two element
let dayTwoHeader = document.createElement("div");
let dayTwoDay = document.createElement("p");
let dayTwoDate = document.createElement("p");
let dayTwoimg = document.createElement("img");
let dayTwoimgDiv = document.createElement("div");
let dayTwoDegree = document.createElement("p");
//day three element
let dayThreeHeader = document.createElement("div");
let dayThreeDay = document.createElement("p");
let dayThreeDate = document.createElement("p");
let dayThreeimg = document.createElement("img");
let dayThreeimgDiv = document.createElement("div");
let dayThreeDegree = document.createElement("p");
//day four element
let dayFourHeader = document.createElement("div");
let dayFourDay = document.createElement("p");
let dayFourDate = document.createElement("p");
let dayFourimg = document.createElement("img");
let dayFourimgDiv = document.createElement("div");
let dayFourDegree = document.createElement("p");
//day five element
let dayFiveHeader = document.createElement("div");
let dayFiveDay = document.createElement("p");
let dayFiveDate = document.createElement("p");
let dayFiveimg = document.createElement("img");
let dayFiveimgDiv = document.createElement("div");
let dayFiveDegree = document.createElement("p");

let daysUl = document.createElement("ul");
window.addEventListener("load", () => {
  let preloader = document.querySelector(".loader");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      locationNow.innerHTML = `Allow Location Access`;
    }
  }

  function getAxios(locations) {
    axios
      .get(locations)
      .then(({ data }) => {
        preloader.classList.add("data--preloader");
        localStorage.setItem("weather", JSON.stringify(data));
        createDom(data);
      })
      .catch((err) => {
        locationNow.innerHTML = `Offline - Rerouting`;
        let data = JSON.parse(localStorage.getItem("weather"));
        console.log("catch error");
        createDom(data);
      });
  }

  function success({ coords }) {
    getAxios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely,hourly&appid=309245fd3b531818aa6d2d05d5d0ee78`
    );
  }

  function error(err) {
    locationNow.innerHTML = `Allow Geolocation`;
    let data = JSON.parse(localStorage.getItem("weather"));
    errDom(data);
  }

  function errDom(data) {
    console.log("offline");
    let locationNow = document.querySelector(".js-location-current");
    locationNow.innerHTML = `Time Zone - ${data.timezone}`;

    let daySection = document.createElement("section");
    daySection.setAttribute("class", "day-list");
    daysUl.setAttribute("class", "search--result js-search--result");
    //setting Attribute
    currentDegree.setAttribute("class", "current--degree");
    currentDescription.setAttribute("class", "current--description");
    preloader.setAttribute("class", "preloader");
    currentSection.setAttribute("class", "current");
    water.setAttribute("class", "measurement--span js--water");
    waterLevel.setAttribute("class", "measurement--span js--water-level");
    waterLi.setAttribute("class", "measure measurement--value-water");
    humidity.setAttribute("class", "measurement--span js--humidity");
    humidityPercent.setAttribute(
      "class",
      "measurement--span js--humidity-percent"
    );
    humidityLi.setAttribute("class", "measure measurement--value-humidity");
    speed.setAttribute("class", "measurement--span js--wind");
    speedMeter.setAttribute("class", "measurement--span js--wind-speed");
    speedLi.setAttribute("class", "measure measurement--value-speed");
    measureUl.setAttribute("class", "measurement--value");
    measureAside.setAttribute("class", "measurement");
    let headings = [
      dayOneHeader,
      dayTwoHeader,
      dayThreeHeader,
      dayFourHeader,
      dayFiveHeader,
    ];
    for (let i = 0; i < headings.length; i++) {
      headings[i].setAttribute("class", "heading-headers");
    }
    //setting icon attribute

    dayOneimg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
    );
    dayTwoimg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
    );
    dayThreeimg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
    );
    dayFourimg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
    );
    dayFiveimg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
    );
    //setting Alt Attribute
    dayOneimg.setAttribute("alt", "offline");
    dayTwoimg.setAttribute("alt", "offline");
    dayThreeimg.setAttribute("alt", "offline");
    dayFourimg.setAttribute("alt", "offline");
    dayFiveimg.setAttribute("alt", "offline");
    // dayFourimg.setAttribute('alt', 'iconFour');
    //writing content --main
    let scale = Math.round(data.current.temp - 273.15);
    currentDegree.innerHTML = scale + "&deg";
    currentDescription.innerHTML = data.current.weather[0].main;
    //writing content -- other info
    water.innerHTML = "Pressure";
    waterLevel.innerHTML = data.current.pressure + "Pa";
    humidity.innerHTML = "Humidity";
    humidityPercent.innerHTML = data.current.humidity + "%";
    speed.innerHTML = "Wind-speed";
    speedMeter.innerHTML = data.current.wind_speed + "m/s";
    // writing content--days
    const today = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day1 = today.getDay();
    //     let day1 = new Date(1599476400)
    // birthday.getDay()
    var currentDate = new Date();

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    // var year = currentDate.getFullYear();
    //day one
    dayOneDegree.innerHTML = `${Math.round(
      data.daily[1].temp.day - 273.15
    )} &deg; c`;
    dayOneDay.innerHTML = `Date`;
    dayOneDate.innerHTML = `${date + 1} / ${month}`;
    //day two
    dayTwoDegree.innerHTML = `${Math.round(
      data.daily[2].temp.day - 273.15
    )} &deg; c`;
    dayTwoDay.innerHTML = `Date`;
    dayTwoDate.innerHTML = `${date + 2} / ${month}`;
    //day three
    dayThreeDegree.innerHTML = `${Math.round(
      data.daily[3].temp.day - 273.15
    )} &deg; c`;
    dayThreeDay.innerHTML = `Date`;
    dayThreeDate.innerHTML = `${date + 3} / ${month}`;
    //day four
    dayFourDegree.innerHTML = `${Math.round(
      data.daily[4].temp.day - 273.15
    )} &deg; c`;
    dayFourDay.innerHTML = `Date`;
    dayFourDate.innerHTML = `${date + 4} / ${month}`;
    //day five
    dayFiveDegree.innerHTML = `${Math.round(
      data.daily[5].temp.day - 273.15
    )} &deg; c`;
    dayFiveDay.innerHTML = `Date`;
    dayFiveDate.innerHTML = `${date + 5} / ${month}`;

    //Appending / Prepending
    waterDiv.prepend(water, waterLevel);
    waterLi.prepend(waterDiv);
    humidityDiv.prepend(humidity, humidityPercent);
    humidityLi.prepend(humidityDiv);
    speedLi.prepend(speedDiv);
    speedDiv.prepend(speed, speedMeter);
    measureUl.prepend(waterLi, humidityLi, speedLi);
    measureAside.prepend(measureUl);
    currentSection.append(preloader, currentDegree, currentDescription);

    //day Prepend
    dayOneHeader.prepend(dayOneDay, dayOneDate);
    dayTwoHeader.prepend(dayTwoDay, dayTwoDate);
    dayThreeHeader.prepend(dayThreeDay, dayThreeDate);
    dayFourHeader.prepend(dayFourDay, dayFourDate);
    dayFiveHeader.prepend(dayFiveDay, dayFiveDate);
    dayOneimgDiv.prepend(dayOneimg);
    dayTwoimgDiv.prepend(dayTwoimg);
    dayThreeimgDiv.prepend(dayThreeimg);
    dayFourimgDiv.prepend(dayFourimg);
    dayFiveimgDiv.prepend(dayFiveimg);

    dayOneLi.prepend(dayOneHeader, dayOneimgDiv, dayOneDegree);
    dayTwoLi.prepend(dayTwoHeader, dayTwoimgDiv, dayTwoDegree);
    dayThreeLi.prepend(dayThreeHeader, dayThreeimgDiv, dayThreeDegree);
    dayFourLi.prepend(dayFourHeader, dayFourimgDiv, dayFourDegree);
    dayFiveLi.prepend(dayFiveHeader, dayFiveimgDiv, dayFiveDegree);

    daysUl.prepend(dayOneLi, dayTwoLi, dayThreeLi, dayFourLi, dayFiveLi);
    daySection.prepend(daysUl);
    wrapper.prepend(currentSection, measureAside, daySection);
  }
  getLocation();

  function createDom(data) {
    //current location secton
    if (locationNow.innerHTML.trim().length > 3) {
      //Elements are being updated based on DOM creation
      // preloader.classList.add('data--preloader');
      let locationNow = document.querySelector(".js-location-current");
      locationNow.innerHTML = `Time Zone - ${data.timezone}`;
      let scale = Math.round(data.current.temp - 273.15);
      currentDegree.innerHTML = scale + "&deg";
      currentDescription.innerHTML = data.current.weather[0].main;
      //writing content -- other info
      water.innerHTML = "Pressure";
      waterLevel.innerHTML = data.current.pressure + "Pa";
      humidity.innerHTML = "Humidity";
      humidityPercent.innerHTML = data.current.humidity + "%";
      speed.innerHTML = "Wind-speed";
      speedMeter.innerHTML = data.current.wind_speed + "m/s";
      // writing content--days
      const today = new Date();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day1 = today.getDay();
      //     let day1 = new Date(1599476400)
      // birthday.getDay()
      var currentDate = new Date();

      var date = currentDate.getDate();
      var month = currentDate.getMonth(); //Be careful! January is 0 not 1
      // var year = currentDate.getFullYear();
      //day one
      dayOneDegree.innerHTML = `${Math.round(
        data.daily[1].temp.day - 273.15
      )} &deg; c`;
      dayOneDay.innerHTML = `Date`;
      dayOneDate.innerHTML = `${date + 1} / ${month}`;
      //day two
      dayTwoDegree.innerHTML = `${Math.round(
        data.daily[2].temp.day - 273.15
      )} &deg; c`;
      dayTwoDay.innerHTML = `Date`;
      dayTwoDate.innerHTML = `${date + 2} / ${month}`;
      //day three
      dayThreeDegree.innerHTML = `${Math.round(
        data.daily[3].temp.day - 273.15
      )} &deg; c`;
      dayThreeDay.innerHTML = `Date`;
      dayThreeDate.innerHTML = `${date + 3} / ${month}`;
      //day four
      dayFourDegree.innerHTML = `${Math.round(
        data.daily[4].temp.day - 273.15
      )} &deg; c`;
      dayFourDay.innerHTML = `Date`;
      dayFourDate.innerHTML = `${date + 4} / ${month}`;
      //day five
      dayFiveDegree.innerHTML = `${Math.round(
        data.daily[5].temp.day - 273.15
      )} &deg; c`;
      dayFiveDay.innerHTML = `Date`;
      dayFiveDate.innerHTML = `${date + 5} / ${month}`;
    } else {
      //DOM created on first page load
      let locationNow = document.querySelector(".js-location-current");
      locationNow.innerHTML = `Time Zone - ${data.timezone}`;

      let daySection = document.createElement("section");
      daySection.setAttribute("class", "day-list");
      daysUl.setAttribute("class", "search--result js-search--result");
      //setting Attribute
      currentDegree.setAttribute("class", "current--degree");
      currentDescription.setAttribute("class", "current--description");
      preloader.setAttribute("class", "preloader");
      currentSection.setAttribute("class", "current");
      water.setAttribute("class", "measurement--span js--water");
      waterLevel.setAttribute("class", "measurement--span js--water-level");
      waterLi.setAttribute("class", "measure measurement--value-water");
      humidity.setAttribute("class", "measurement--span js--humidity");
      humidityPercent.setAttribute(
        "class",
        "measurement--span js--humidity-percent"
      );
      humidityLi.setAttribute("class", "measure measurement--value-humidity");
      speed.setAttribute("class", "measurement--span js--wind");
      speedMeter.setAttribute("class", "measurement--span js--wind-speed");
      speedLi.setAttribute("class", "measure measurement--value-speed");
      measureUl.setAttribute("class", "measurement--value");
      measureAside.setAttribute("class", "measurement");
      let headings = [
        dayOneHeader,
        dayTwoHeader,
        dayThreeHeader,
        dayFourHeader,
        dayFiveHeader,
      ];
      for (let i = 0; i < headings.length; i++) {
        headings[i].setAttribute("class", "heading-headers");
      }
      //setting icon attribute

      dayOneimg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
      );
      dayTwoimg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
      );
      dayThreeimg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
      );
      dayFourimg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
      );
      dayFiveimg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
      );
      //setting Alt Attribute
      dayOneimg.setAttribute("alt", "offline");
      dayTwoimg.setAttribute("alt", "offline");
      dayThreeimg.setAttribute("alt", "offline");
      dayFourimg.setAttribute("alt", "offline");
      dayFiveimg.setAttribute("alt", "offline");
      // dayFourimg.setAttribute('alt', 'iconFour');
      //writing content --main
      let scale = Math.round(data.current.temp - 273.15);
      currentDegree.innerHTML = scale + "&deg";
      currentDescription.innerHTML = data.current.weather[0].main;
      //writing content -- other info
      water.innerHTML = "Pressure";
      waterLevel.innerHTML = data.current.pressure + "Pa";
      humidity.innerHTML = "Humidity";
      humidityPercent.innerHTML = data.current.humidity + "%";
      speed.innerHTML = "Wind-speed";
      speedMeter.innerHTML = data.current.wind_speed + "m/s";
      // writing content--days
      const today = new Date();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day1 = today.getDay();
      //     let day1 = new Date(1599476400)
      // birthday.getDay()
      var currentDate = new Date();

      var date = currentDate.getDate();
      var month = currentDate.getMonth(); //Be careful! January is 0 not 1
      // var year = currentDate.getFullYear();
      //day one
      dayOneDegree.innerHTML = `${Math.round(
        data.daily[1].temp.day - 273.15
      )} &deg; c`;
      dayOneDay.innerHTML = `Date`;
      dayOneDate.innerHTML = `${date + 1} / ${month}`;
      //day two
      dayTwoDegree.innerHTML = `${Math.round(
        data.daily[2].temp.day - 273.15
      )} &deg; c`;
      dayTwoDay.innerHTML = `Date`;
      dayTwoDate.innerHTML = `${date + 2} / ${month}`;
      //day three
      dayThreeDegree.innerHTML = `${Math.round(
        data.daily[3].temp.day - 273.15
      )} &deg; c`;
      dayThreeDay.innerHTML = `Date`;
      dayThreeDate.innerHTML = `${date + 3} / ${month}`;
      //day four
      dayFourDegree.innerHTML = `${Math.round(
        data.daily[4].temp.day - 273.15
      )} &deg; c`;
      dayFourDay.innerHTML = `Date`;
      dayFourDate.innerHTML = `${date + 4} / ${month}`;
      //day five
      dayFiveDegree.innerHTML = `${Math.round(
        data.daily[5].temp.day - 273.15
      )} &deg; c`;
      dayFiveDay.innerHTML = `Date`;
      dayFiveDate.innerHTML = `${date + 5} / ${month}`;

      //Appending / Prepending
      waterDiv.prepend(water, waterLevel);
      waterLi.prepend(waterDiv);
      humidityDiv.prepend(humidity, humidityPercent);
      humidityLi.prepend(humidityDiv);
      speedLi.prepend(speedDiv);
      speedDiv.prepend(speed, speedMeter);
      measureUl.prepend(waterLi, humidityLi, speedLi);
      measureAside.prepend(measureUl);
      currentSection.append(preloader, currentDegree, currentDescription);

      //day Prepend
      dayOneHeader.prepend(dayOneDay, dayOneDate);
      dayTwoHeader.prepend(dayTwoDay, dayTwoDate);
      dayThreeHeader.prepend(dayThreeDay, dayThreeDate);
      dayFourHeader.prepend(dayFourDay, dayFourDate);
      dayFiveHeader.prepend(dayFiveDay, dayFiveDate);
      dayOneimgDiv.prepend(dayOneimg);
      dayTwoimgDiv.prepend(dayTwoimg);
      dayThreeimgDiv.prepend(dayThreeimg);
      dayFourimgDiv.prepend(dayFourimg);
      dayFiveimgDiv.prepend(dayFiveimg);

      dayOneLi.prepend(dayOneHeader, dayOneimgDiv, dayOneDegree);
      dayTwoLi.prepend(dayTwoHeader, dayTwoimgDiv, dayTwoDegree);
      dayThreeLi.prepend(dayThreeHeader, dayThreeimgDiv, dayThreeDegree);
      dayFourLi.prepend(dayFourHeader, dayFourimgDiv, dayFourDegree);
      dayFiveLi.prepend(dayFiveHeader, dayFiveimgDiv, dayFiveDegree);

      daysUl.prepend(dayOneLi, dayTwoLi, dayThreeLi, dayFourLi, dayFiveLi);
      daySection.prepend(daysUl);
      wrapper.prepend(currentSection, measureAside, daySection);
    }
  }

  //Widget Codes

  function widget() {
    let widget = document.querySelector(".widget");
    let jsWidget = document.querySelector(".widget--result");
    let navWidget = document.querySelector(".nav--search-component");
    navWidget.addEventListener("click", function (params) {
      let widgetClose = document.querySelector(".widget--back");
      widget.classList.add("open");
      let searchForm = document.querySelector("form");

      let search = searchForm.querySelector("input");
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let listItem = document.createElement("li");
        let newValue = search.value.trim();
        listItem.innerHTML = newValue + " ";
        jsWidget.append(listItem);
        widget.classList.remove("open");

        getSearch(newValue);
      });
      widgetClose.addEventListener("click", () => {
        widget.classList.remove("open");
      });
    });
  }

  function getSearch(newValue) {
    let locations = ` https://api.openweathermap.org/data/2.5/weather?q=${newValue}&appid=309245fd3b531818aa6d2d05d5d0ee78`;
    axios
      .get(locations)
      .then(({ data }) => {
        // createDom(data);

        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        try {
          getAxios(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=309245fd3b531818aa6d2d05d5d0ee78`
          );
        } catch (error) {
          alert("Allow Location Access");
        }

        // updateDisplay(latitude, longitude)
      })
      .catch((err) => {
        alert("provide valid location");
      });
  }
  widget();
});
