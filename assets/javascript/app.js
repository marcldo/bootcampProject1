//$(document).ready(function () {

$("#submit").on("click", function () {

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cities?q=toronto",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                '800b518a5824533907d36cfa8844ff50');
        }
    }).then(function (response) {
        console.log(response);
    });
});









   // });
