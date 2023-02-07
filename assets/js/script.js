var APIKey = "&APPID=b5584f3fab1573ab189fa3f4a7fee13c"
let history = [];
init()
$("#search-button").on("click",function(event){
    event.preventDefault()
    $("#forecast").empty()
    $("#today").empty()
    var city = $("#search-input").val().trim()
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+APIKey
    getweather(queryURL,city)

    if(history.includes(city)){return}else{
    history.push(city)
    localStorage.setItem("history",JSON.stringify(history))
    $("#history").empty()
    populatehistory(city)
    }

    $("#search-input").val("")
})

$("#history").on("click","button",function(event){
    event.preventDefault()
    $("#forecast").empty()
    $("#today").empty()
    var city = $(this).text()
    console.log(city)
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+APIKey
    getweather(queryURL,city)
})

function init(){
    history = JSON.parse(localStorage.getItem("history"))
    if(history===null){history = []}else{
        populatehistory()
    }
}

function populatehistory(city){
    for(i=0;i<history.length;i++){
        var cityhist = $("<button></button>").text(history[i])
        cityhist.attr("class","btn btn-secondary")
        cityhist.attr("data-city",city)
        cityhist.attr("id","histbutton")
        $("#history").append(cityhist)
    }
}

function getweather(queryURL,city){
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
                    var date = $("<h4></h4>").text(city+" "+timedate.format("D/M/YYYY"))
                    var iconurl = "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+".png"
                    var icon = $("<img></img>").attr("src",iconurl)
                    date.append(icon)
                    var temp= $("<p></p>").text("Temp: "+(data.list[0].main.temp-273.15).toFixed(2)+"°C")
                    var wind = $("<p></p>").text("Wind: "+data.list[0].wind.speed+" KPH")
                    var humidity = $("<p></p>").text("Humidity: "+data.list[0].main.humidity+"%")
                    day.append(date,temp,wind,humidity)
                $("#today").append(day)
            }
            else if(j==today+5&&moment().hour()<15) {
                day.attr("id","forecast5")
                    var listlength = data.list.length-1
                    var timedate = moment.unix(data.list[listlength].dt).utc()
                    var date = $("<h4></h4>").text(timedate.format("D/M/YYYY"))
                    var iconurl = "http://openweathermap.org/img/w/"+data.list[listlength].weather[0].icon+".png"
                    var icon = $("<img></img>").attr("src",iconurl)
                    var temp= $("<p></p>").text("Temp: "+(data.list[listlength].main.temp-273.15).toFixed(2)+"°C")
                    var wind = $("<p></p>").text("Wind: "+data.list[listlength].wind.speed+" KPH")
                    var humidity = $("<p></p>").text("Humidity: "+data.list[listlength].main.humidity+"%")
                    day.append(date,icon,temp,wind,humidity)
                $("#forecast").append(day)
            }
            else{
                day.attr("id","forecast5")
                for (let i=0;i<data.list.length;i++){
                    var timedate = moment.unix(data.list[i].dt).utc()
                    if(moment(timedate).date()==j&&moment(timedate).hour()>=12&&moment(timedate).hour()<15){
                    var date = $("<h4></h4>").text(timedate.format("D/M/YYYY"))
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
}
