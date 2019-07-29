// Clear the error inside the modaldata
$("#error").html("");

// Actions to be performed onclick of search button
$("#submit").on("click", function () {
  $("#error").html("");
  let cityName = $("#cities")
    .val()
    .trim();

  //queryUrl for API call
  let queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cityName;

  //ajax call requesting data
  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("user-key", "800b518a5824533907d36cfa8844ff50 ");
    }
  }).then(function (response) {
    if (response.location_suggestions.length === 0) {
      $("#datainsert").text("Sorry No data Found");
      // Calling cleardata function to clear all inputs
      cleardata();
    } else {
      // Calling cleardata function to clear all inputs
      cleardata();

      var op = "<table>";

      //populate the modal with the cities
      populatedatainsertmodal(op, response);
    }
  });
});

//Action to be performed onclick of modal data insert
$("#datainsert").on("click", ".location", function (e) {
  // gets cityname,state,city onclick of any row

  var tableCity = $(this).data("name");
  console.log(tableCity);
  var city = tableCity.substring(0, tableCity.indexOf(","));
  console.log(city);
  var state = $(this).data("state");
  console.log(state);

  if (tableCity != "" && city != "" && state != "") {
    //Zomato queryUrl for API call
    var tQueryURL =
      "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&city=" +
      city +
      "&stateCode=" +
      state;

    //ajax call requesting data
    $.ajax({
      url: tQueryURL,
      method: "GET"
    }).then(function (response) {
      if (response.page.totalElements === 0) {
        $("#error").text(`Sorry No data found!!`);
      } else {
        //call displayeventdata function to populate the div with event data
        displayeventdata(response);
        $(".modal").modal("hide");
      }
    });

    //Zomato queryUrl for API call
    var zQueryURL =
      "https://developers.zomato.com/api/v2.1/collections?city_id=" +
      $(this).data("city-id");

    //ajax call requesting data
    $.ajax({
      url: zQueryURL,
      method: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("user-key", "800b518a5824533907d36cfa8844ff50");
      }
    }).then(function (response) {
      //call zomatodata function to populate the div with zomato data
      populatezomatodata(response);
    });
  } else {
    $("#error").text("City / State not defined in API");
  }
});

//populate datainsert modal
function populatedatainsertmodal(op, response) {
  for (i = 0; i < response.location_suggestions.length; i++) {
    var result = response.location_suggestions[i];
    console.log(result);
    op += `<tr> <td class="location" data-name="${result.name}" data-id="${
      result.country_id
      }" data-state="${result.state_code}" 
    data-city-id="${result.id}">  
   <img src="${
      result.country_flag_url
      }" align="left"></img>&nbsp; &nbsp;&nbsp; &nbsp;<span> ${result.name}<span> </td>`;
  }

  op += "</table>";
  document.getElementById("datainsert").innerHTML = op;
}

//populating zomato data
function populatezomatodata(response) {
  console.log(response)
  var collectionsTable = "<table>";
  collectionsTable += "<tr><th> RESTAURANTS </th></tr>";
  for (var i = 0; i < 10; i++) {
    var result = response.collections[i].collection;
    collectionsTable += `<tr><td><a href=${
      result.share_url
      } target = "_blank"><img src=${
      result.image_url
      } align="left" width="300" height="200">${
      result.description
      }</a></td></tr>`;
  }
  collectionsTable += "</table>";
  document.getElementById("collectionsData").innerHTML = collectionsTable;
}

//populate eventdata
function displayeventdata(response) {
  var eventsTable = "<table>";
  eventsTable += "<tr><th> EVENTS </th></tr>";
  for (var i = 0; i < 10; i++) {
    var result = response._embedded.events[i];

    eventsTable += `<tr><td><a href=${result.url} target= "_blank"><img src=${
      result.images[0].url
      } align="left" width="300" height="200"> ${result.name}</a> <br><br> ${
      result._embedded.venues[0].name
      } <br><br> ${result.dates.start.localDate}</td></tr>`;
  }
  eventsTable += "</table>";
  document.getElementById("eventsData").innerHTML = eventsTable;
}

//clear all data
function cleardata() {
  $("#eventsData").html("");
  $("#collectionsData").html("");
  $("#cities").val("");
}
