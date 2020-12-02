$( document ).ready(function() {
    

    var lArr = []
    

    var apiKey= "13da59a70b35153b31d2c096606c4719";
    var searchButton = $("#searchButton")
    searchButton.on("click", function(e) {
        e.preventDefault();
        var city = $("#searchCity").val();
        
        lArr.push(city)
       
        
        localStorage.setItem("cities", JSON.stringify(lArr))
    
        getStorage();

        getWeather(city);
        console.log(city)
    });
    function getWeather(city) {
        $("#currentCityName").empty();
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
       
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            
            $(".temperature").html("");
            $(".humidity").html("");
            $(".windSpeed").html("");
            $(".coordLon").html("");
            $(".coordLat").html("");
            var cityName = response.name;
            console.log(cityName)
           

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
    getStorage();
    function getStorage() {
        $(".city-area").empty();
        var storedCities = JSON.parse(localStorage.getItem("cities")) 
        if (storedCities==null) {
            storedCities=[];
            storedCities.push(city)
            renderCities();
            
        }; 
        
        
        var noDuplicates = [...new Set(lArr)]
        
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
    
});







