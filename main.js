const myCity = document.querySelector("#city");
const icon = document.querySelector(".icon");
const wetest = document.querySelector(".wetest");

const key = "r4o13ANk43cFCROsCglstSGjNR7LVdbQ";

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude);
  async function CntryCd() {
    const myCntryCode = `http://api.geonames.org/countryCodeJSON?formatted=true&lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=prajanBnet`;
    const myCntryDetails = await fetch(myCntryCode);
    const myCntryToJson = await myCntryDetails.json();
    const countryName = JSON.stringify(myCntryToJson.countryName);
    console.log(JSON.stringify(myCntryToJson.countryName));



  }
  CntryCd();
});

async function weather() {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=r4o13ANk43cFCROsCglstSGjNR7LVdbQ&q=${myCity.value}`;

  const response = await fetch(url);
  const CountryDetails = await response.json();
  const locationKey = CountryDetails[0].Key;

  const currentConditionUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=r4o13ANk43cFCROsCglstSGjNR7LVdbQ`;
  const conditionResponse = await fetch(currentConditionUrl);
  const convertCurrentCondition = await conditionResponse.json();

  console.log(CountryDetails);
  console.log(convertCurrentCondition);
  console.log(
    `Temperature in ${CountryDetails[0].Country.EnglishName} is currenty ${convertCurrentCondition[0].WeatherText} tem ${convertCurrentCondition[0].Temperature.Metric.Value}`
  );

  icon.innerHTML = `<i>CityName:<i> ${CountryDetails[0].EnglishName} <br><br>  Temperature: ${convertCurrentCondition[0].Temperature.Metric.Value}`;
  wetest.innerHTML = convertCurrentCondition[0].WeatherText;
}

