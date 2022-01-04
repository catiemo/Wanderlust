// Foursquare API Info
const clientId = 'Q1T4252OR1XP12LCG44PHMQ5EAZDUJ5BZRJ4YET4RNAQXWGD';
const clientSecret = 'Z5L0PH5G2O1X44WJ3KAZBHRUX2JNLIK1L1EPVF4L13ULBDJN';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '0e3b0ecf9ad546056a5945e4f89574e8';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20211216`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log(response);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(element => element.venue)
      console.log(venues);
      return venues
    }
  }
  catch(error) {
    console.log(error)
  }
}

const getForecast = async() => {
  const city = $input.val()
  const urlToFetch = weatherUrl + '?&q=' + city + '&APPID=' + openWeatherKey;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      return jsonResponse
    }
  }
  catch(error) {
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.catergories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
  .then(
    venue => {
      return renderVenues(venues)
    }
  )
  getForecast()
  .then(
    forecast => {
      return renderForecast(forecast)
    }
  )
  return false;
}

$submit.click(executeSearch)