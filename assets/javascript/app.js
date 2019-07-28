$("#submit").on("click", function () {
  $("#error").html("");
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
    if (response.location_suggestions.length === 0) {
      console.log("inside resp")
      $("#datainsert").text("Sorry No data Found");
      $("#cities").val("");
      $("#eventsData").html("");
      $("#collectionsData").html("");

    }
    else {
      $("#eventsData").html("");
      $("#collectionsData").html("");
      $("#cities").val("");
      var op = `<table class="citiesSearchResult">`;
      console.log(response);


      for (i = 0; i < response.location_suggestions.length; i++) {
        var result = response.location_suggestions[i];
        console.log(result);
        op += `<tr> <td class="location" data-name="${result.name}" data-id="${result.country_id}" data-state="${result.state_code}" 
        data-city-id="${result.id}">  
       <img src="${result.country_flag_url}" align="left"></img>&nbsp; &nbsp;&nbsp; &nbsp; ${result.name} </td>`;
      }

      op += "</table>";
      document.getElementById("datainsert").innerHTML = op;

    }
  });
});


$("#datainsert").on("click", ".location", function (e) {
  console.log("hey, location got clicked", $(this).data("name"));
  // console.log("hey, location got clicked", $(this).data("id"));


  var tableCity = $(this).data("name");
  console.log(tableCity);
  var city = tableCity.substring(0, tableCity.indexOf(","));
  console.log(city);
  var state = $(this).data("state");
  console.log(state);
  var tQueryURL =
    "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&city=" +
    city +
    "&stateCode=" +
    state;

  $.ajax({
    url: tQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    if (response.page.totalElements === 0) {
      $("#error").text(`Sorry No data !! Hahaha`);
    }
    else {
      displayselecteddata(response);

      $(".modal").modal("hide");


      console.log(response);



      ("<tr><th> CITY</th></tr>");
      var eventsTable = "<table>";
      eventsTable += "<tr><th> EVENTS </th></tr>";
      for (var i = 0; i < 10; i++) {
        var result = response._embedded.events[i];

        eventsTable += `<tr><td><a href=${result.url} target= "_blank"><img src=${result.images[0].url} align="left" width="300" height="200"> ${result.name
          }</a> <br><br> ${result._embedded.venues[0].name} <br><br> ${
          result.dates.start.localDate
          }</td></tr>`;
        console.log(result.url);
      }
      eventsTable += "</table>";
      document.getElementById("eventsData").innerHTML = eventsTable;
    }
  });

  var zQueryURL = "https://developers.zomato.com/api/v2.1/collections?city_id=" + $(this).data("city-id");

  $.ajax({
    url: zQueryURL,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("user-key", "800b518a5824533907d36cfa8844ff50 ");
    }
  }).then(function (response) {
    console.log(response);
    console.log(response.collections[0]);
    var collectionsTable = `<thead>
    <tr>
        <th>  
          Restaurants
        </th>
    </tr>
    </thead>`
    collectionsTable += "<tbody>";
    for (var i = 0; i < 10; i++) {
      var result = response.collections[i].collection;
      collectionsTable += `<tr><td><a href=${result.url} target = "_blank"><img src=${result.image_url} align="left" width="300" height="200"><br>${result.title}</a><br>
     ${result.description} </td></tr>`;

    }
    collectionsTable += "</tbody>";
    document.getElementById("collectionsData").innerHTML = collectionsTable;
  });
});

function displayselecteddata(response) {
  var eventsTable = "<table>";
  eventsTable += "<tr><th> EVENTS </th></tr>";
  for (var i = 0; i < 10; i++) {
    var result = response._embedded.events[i];

    eventsTable += `<tr><td><a href=${result.url} target= "_blank"><img src=${result.images[0].url} align="left" width="300" height="200"> ${result.name
      }</a> <br><br> ${result._embedded.venues[0].name} <br><br> ${
      result.dates.start.localDate
      }</td></tr>`;
    console.log(result.url);
  }
  eventsTable += "</table>";
  document.getElementById("eventsData").innerHTML = eventsTable;
}