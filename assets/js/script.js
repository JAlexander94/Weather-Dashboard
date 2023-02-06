var APIKey = "&APPID=b5584f3fab1573ab189fa3f4a7fee13c"

$("#search-button").on("click",function(){
    event.preventDefault()
    $("#forecast").empty()
    $("#today").empty()
    var city = $("#search-input").val().trim()
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+APIKey

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var lon = response.coord.lon
        var lat = response.coord.lat
        var fullqueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+APIKey
        $.ajax({
            url: fullqueryURL,
            method: "GET"
        }).then(function(data){
            var today = moment().date()
            for(let j=today;j<today+6;j++){
                var day = $("<div></div>")
                day.attr("class","col")
                if(j==today)
                {
                    day.attr("id","forecasttoday")
                        var timedate = moment.unix(data.list[0].dt).utc()
                        var date = $("<h3></h3>").text(city+" "+timedate.format("D/M/YYYY"))
                        var iconurl = "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+".png"
                        var icon = $("<img></img>").attr("src",iconurl)
                        date.append(icon)
                        var temp= $("<p></p>").text("Temp: "+(data.list[0].main.temp-273.15).toFixed(2)+"°C")
                        var wind = $("<p></p>").text("Wind: "+data.list[0].wind.speed+" KPH")
                        var humidity = $("<p></p>").text("Humidity: "+data.list[0].main.humidity+"%")
                        $("#today").append(date,temp,wind,humidity)
                    //$("#today").append(day)
                }
                else{
                    day.attr("id","forecast5")
                    for (let i=0;i<data.list.length;i++){
                        var timedate = moment.unix(data.list[i].dt).utc()
                        if(moment(timedate).date()==j&&moment(timedate).hour()>=12&&moment(timedate).hour()<15){
                        var date = $("<h3></h3>").text(timedate.format("D/M/YYYY"))
                        var iconurl = "http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png"
                        var icon = $("<img></img>").attr("src",iconurl)
                        var temp= $("<p></p>").text("Temp: "+(data.list[i].main.temp-273.15).toFixed(2)+"°C")
                        var wind = $("<p></p>").text("Wind: "+data.list[i].wind.speed+" KPH")
                        var humidity = $("<p></p>").text("Humidity: "+data.list[i].main.humidity+"%")
                        day.append(date,icon,temp,wind,humidity)
                        }
                    }
                    $("#forecast").append(day)}
            }
        })
    })
})