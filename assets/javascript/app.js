$("#submit").on("click", function() {
  let cityName = $("#cities")
    .val()
    .trim();
  let queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cityName;
  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("user-key", "800b518a5824533907d36cfa8844ff50 ");
    }
  }).then(function(response) {
    var op = "<table>";

    op +=
      "<tr><th> CITY NAME</th> <th>COUNTRY NAME</th> <th>FLAG IMAGE</th></tr>";
    console.log(response.country_flag_url);
    for (i = 0; i < response.location_suggestions.length; i++) {
      var result = response.location_suggestions[i];
      op +=
        "<tr> <td>" +
        result.name +
        "</td><td>" +
        result.country_name +
        "</td><td><img src=" +
        result.country_flag_url +
        "></img></td>";
    }

    op += "</table>";
    document.getElementById("datainsert").innerHTML = op;
  });
});
$("#datainsert").on("click", function(e) {
  console.log(e.target);
});
