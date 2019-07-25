$("#submit").on("click", function () {
  let cityName = $("#cities")
    .val()
    .trim();
  let queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cityName;
  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("user-key", "800b518a5824533907d36cfa8844ff50 ");
    }
  }).then(function (response) {
    var op = "<table>";

    op +=
      "<tr><th> CITY</th></tr>";
    console.log(response.country_flag_url);
    for (i = 0; i < response.location_suggestions.length; i++) {
      var result = response.location_suggestions[i];
      op +=
        "<tr> <td>" +
        result.name + "<img src=" +
        result.country_flag_url +
        "></img> </td> </tr>";
    }

    op += "</table>";
    document.getElementById("datainsert").innerHTML = op;
  });
});
$("#datainsert").on("click", function (e) {

  console.log(e.target);
  var tableCity = $(e.target).text();
  console.log(tableCity);
  var city = tableCity.substring(0, tableCity.indexOf(","));
  console.log(city);
  var state = tableCity.substring(tableCity.indexOf(",") + 2);
  console.log(state);
  var tQueryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&city=" + city + "&stateCode=" + state;

  $.ajax({
    url: tQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    "<tr><th> CITY</th></tr>";
    var eventsTable = "<table>";
    eventsTable += "<tr><th> EVENTS </th></tr>"
    for (var i = 0; i < 10; i++) {
      var result = response._embedded.events[i];
      eventsTable += `<tr><td><a href=${result.url}>${result.name} &nbsp; &nbsp;  ${result._embedded.venues[0].name} &nbsp; &nbsp; ${result.dates.start.localDate}</a></td></tr>`
console.log(result.url)
    }
    eventsTable += "</table>";
    document.getElementById("eventsData").innerHTML = eventsTable;
  });

});
/*$("#eventsData").on("click", function (e) {
   console.log()
 })*/

