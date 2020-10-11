
    var currentDate = ("#currentDay")
    var cityArr = []
    




    $("#currentDay").text(moment());
    setInterval(displayTodaysDateAndTime, 1000)
    currentDate = $("#currentDay");
    displayTodaysDateAndTime();
    function displayTodaysDateAndTime() {
    currentDate.text(moment().format('L'));
    }

    
 

    var apiKey= "&appid=13da59a70b35153b31d2c096606c4719";
    var searchButton = $("#searchButton")
    searchButton.on("click", function(e) {
        e.preventDefault();
        var city = $("#searchCity").val();
        cityArr.push(city);
        localStorage.setItem("cities", JSON.stringify(cityArr));

    
        getStorage();

        getWeather(city);
    });

    
    function getWeather(city) {
        $("#currentCityName").empty();
        var queryURL= "http://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + city + apiKey
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            
            $(".temperature").html("");
            $(".humidity").html("");
            $(".windSpeed").html("");
            var cityName = response.name;
            console.log(response.name)
           

            var cityP = $("<p>").text(response.name);
           
            var icon = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

            if (cityName.length>1){
                var humidity = response.main.humidity;
                $(".humidity").html("Humidity: " + humidity + " % ");
                var temperature = response.main.temp;
                temperature = (Math.floor(temperature - 273.15)*1.80+32);
                
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
        // console.log(cityArr)
        var noDuplicates = [...new Set(cityArr)]
        // console.log(noDuplicates)
        for(var i=0; i<noDuplicates.length; i++) {
            if (noDuplicates[i].length>0){
                var cityBtn= $("<button>").text(noDuplicates[i]).addClass("city-btn")
                $(".city-area").append(cityBtn);  
                $(".city-area").remove("test");
            }
        
        }
    }
    
    



    $(document).on("click",".city-btn",function() {
        // console.log($(this).text())
       getWeather($(this).text());
    })
    getStorage();











