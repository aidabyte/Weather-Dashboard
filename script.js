$( document ).ready(function() {
    

    var LocationsArr = []

    var apiKey= "&appid=d160bb85543407b24d8ff256704cde0d";
    var searchButton = $("#searchButton")
    searchButton.on("click", function(e) {
        e.preventDefault();
        var city = $("#searchCity").val();
        console.log(city)
        LocationsArr.push(city)
        
        localStorage.setItem("cities", JSON.stringify(LocationsArr))
    
        getStorage();

        getWeather(city);
    });
    function getWeather(city) {
        $("#currentCityName").empty();
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q" + city + apiKey
        
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            
            $(".temperature").html("");
            $(".humidity").html("");
            $(".windSpeed").html("");
            var cityName = response.name;
           

            var cityP = $("<p>").text(response.name)
            
            var icon = $("<img>").attr("src","https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

            if (cityName.length>1){
                var humidity = response.main.humidity;
                $(".humidity").html("Humidity: " + humidity + " % ");
                var temperature = response.main.temp;
                var temperature = (Math.floor(temperature - 273.15)*1.80+32);
                
                $(".temperature").html("Temperature: " + temperature + "&#8457");
                var windSpeed = response.wind.speed;
                $(".windSpeed").html("Wind Speed: " + windSpeed + " MPH ");
                $("#currentCityName").append(cityP,icon);
            }

          

        })
           

    }    
    function getStorage() {
        $(".city-area").empty();
        LocationsArr = JSON.parse(localStorage.getItem("cities")) 
        
        var noDuplicates = [...new Set(LocationsArr)]
        
        for(var i=0; i<noDuplicates.length; i++) {
            if (noDuplicates[i].length>0){
                var cityBtn= $("<button>").text(noDuplicates[i]).addClass("city-btn")
                $(".city-area").append(cityBtn);  
                
            }
        
        }
    }
    
    



    $(document).on("click",".city-btn",function() {
       
       getWeather($(this).text());
    })
    getStorage();
});







