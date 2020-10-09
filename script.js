$( document ).ready(function() {
    console.log( "ready!" );
});



var apiKey= "&appid=13da59a70b35153b31d2c096606c4719";

var queryURL= "api.openweathermap.org/data/2.5/weather?q=" + city + apiKey

var city = $("searchCity").val();
console.log("searchCity")


$.ajax({
    url:queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(response)
})
