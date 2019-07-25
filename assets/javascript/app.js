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
    },
    cache: false
  }).then(function(response) {
    var op = "<table>";

    op +=
      "<tr><th> CITY NAME</th> <th>COUNTRY NAME</th> <th>FLAG IMAGE</th></tr>";
    console.log(response.country_flag_url);
    for (i = 0; i < response.location_suggestions.length; i++) {
      var result = response.location_suggestions[i];
      op += `<tr class="location" data-name="${result.name}"> <td class="${i}">
        ${result.name} 
        </td><td class="${i}"> 
        ${result.country_name} 
        </td><td><img class="${i}" src= 
        ${result.country_flag_url} 
        "></img></td>`;
    }

    op += "</table>";
    document.getElementById("datainsert").innerHTML = op;
    setApiData(response);
  });
});

$("#datainsert").on("click", ".location", function(e) {
  console.log("hey, location got clicked", $(this).data("name"));
});

function setApiData(response) {
  $("#datainsert").on("click", function(e) {
    for (var i = 0; i < response.location_suggestions.length; i++) {
      if (e.target.attributes.class.nodeValue == i) {
        console.log(response.location_suggestions[i]);
      }
    }
  });
  // $("#submit").on("click", function() {
  //   window.location.reload();
  // });
}
