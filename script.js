$( document ).ready(function() {
    

    var cityArr 


    $("currentDay").text(moment());
    setInterval(displayTodaysDate)

    currentDate = $("#currentDay");
    displayTodaysDate();

    function displayTodaysDate() {
        currentDate.text(moment().format('L'));
    }
});

    var apiKey= "&appid=13da59a70b35153b31d2c096606c4719";
    var searchButton = $("#searchButton")
    searchButton.on("click", function(e) {
        e.preventDefault();
        var city = $("#searchCity").val();
        cityArr.push(city)
        localStorage.setItem("cities", JSON.stringify(cityArr))
    
        getStorage();

        getWeather(city);
    });
    function getWeather(city) {
        $("#currentCityName").empty();
        var queryURL= "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + city + apiKey
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)
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
        cityArr = JSON.parse(localStorage.getItem("cities")) 
        
        var noDuplicates = [...new Set(cityArr)]
        
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








