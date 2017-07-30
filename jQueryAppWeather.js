$( document ).ready(function() {
    console.log( "jQuery ready!" );

    var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
    var DARKSKY_API_KEY = 'd28ab0f9b42fc84d1f68799a4c8119fa';
    var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

    var GOOGLE_MAPS_API_KEY = 'AIzaSyCW4dTPRXL8O-w2jKdu0BVjOSXcW7OVdD4';
    var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

    function getCoordinatesForCity (cityName) {
        var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

        return $.getJSON(url) //Jquery automatically parses this as JSON given that the response from the request is JSON-like
            .then(data => data.results[0].geometry.location);

    }

    function getCurrentWeather(coords) {
        var url = CORS_PROXY + DARKSKY_API_URL + DARKSKY_API_KEY + "/" + coords.lat + "," + coords.lng + "?units=si&exclude=minutely,hourly,daily,alerts,flags";

        return $.getJSON(url)
            .then(data => data.currently);

    }

    $(".city-form").submit( function(event) {
        var city = $(".city-input").val();

        $(".city-weather").html("Getting temperature for city " + city);

        getCoordinatesForCity(city)
            .then(getCurrentWeather)
            .then( weather => {
                $(".city-weather").html("<h1>" + "temperature in " + city + " is " + weather.temperature + "<h1>"); //HTML parses HTML for tags, text does not
            });

        event.preventDefault();
    });

});