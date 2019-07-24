


$("#submit").on("click", function () {
    let cityName = $("#cities").val().trim();
    // console.log(cityName);
    let queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cityName;
    $.ajax({
        url: queryURL ,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                '800b518a5824533907d36cfa8844ff50');
        }
    }).then(function (response) {
        console.log(response);
    });
});









   // });
