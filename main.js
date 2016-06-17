var cutEdge = (typeof(Storage) !== "undefined") && 'serviceWorker' in navigator;
var pageQueue = ["philosophy"];

function loadNext() {
    $.get("https://en.wikipedia.org/api/rest_v1/page/summary/philosophy?redirect=true").done(function (data) {
        console.log("!", data);
    }, "JSON");

}


$(document).ready(function() {

});
