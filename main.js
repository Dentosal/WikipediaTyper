var cutEdge = (typeof(Storage) !== "undefined") && 'serviceWorker' in navigator;


$(document).ready(function() {
    $.get("https://en.wikipedia.org/api/rest_v1/page/html/philosophy?redirect=true").success(function (data) {
        console.log("!", data);
    });
    // $.ajax({
    //     headers: {
    //         Accept : "text/plain; charset=utf-8",
    //         "Content-Type": "text/plain; charset=utf-8"
    //     },
    //     data: "data",
    //     success : function(response) {
    //     ...
    //     }
    // });
});
