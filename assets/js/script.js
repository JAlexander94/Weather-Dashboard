var APIKey = "&APPID=b5584f3fab1573ab189fa3f4a7fee13c"

$("#search-button").on("click",function(){
    event.preventDefault()
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
            var today = moment.unix(data.list[1].dt).utc().format("MMM Do, YYYY HH:MM")
            console.log(today)
        })
    })
})