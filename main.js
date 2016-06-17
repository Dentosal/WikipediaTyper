var cutEdge = (typeof(Storage) !== "undefined") && 'serviceWorker' in navigator;
var pageQueue = ["philosophy"];
var displayQueue = [];

function loadNext() {
    if (pageQueue.length === 0) {
        console.log("EMPTY?!");
    }
    var title = pageQueue.splice(Math.random()*pageQueue.length, 1)[0].replace(" ", "_");

    $.get("https://en.wikipedia.org/api/rest_v1/page/summary/title?redirect=true").done(function (data) {
        console.log("!", data);
    }, "JSON");

    pageQueue = _.unique(pageQueue);
}


$(document).ready(function() {

});
