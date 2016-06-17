var cutEdge = (typeof(Storage) !== "undefined") && 'serviceWorker' in navigator;
var pageQueue = ["philosophy"];
var displayQueue = [];
var visitedPages = [];

function normalizeTitle(title) {
    return title.toLowerCase().replace(" ", "_");
}

function loadNext() {
    if (pageQueue.length === 0) {
        console.log("EMPTY?!");
    }
    var title = normalizeTitle(pageQueue.splice(Math.random()*pageQueue.length, 1)[0]);

    $.get("https://en.wikipedia.org/api/rest_v1/page/summary/"+title+"?redirect=true").done(function (data) {
        $("#content").append("<p>"+data.extract+"</p>");
    }, "JSON");

    if (pageQueue.length < 1000) {
        $.get("https://en.wikipedia.org/api/rest_v1/page/related/"+title+"?redirect=true").done(function (data) {
            _.each(_.pluck(data.items, "title"), function(title) {
                var t = normalizeTitle(title);
                if (!(_.contains(visitedPages, t) || _.contains(displayQueue, t))) {
                    pageQueue.push(t);
                }
            })
        }, "JSON");
    }
}


$(document).ready(function() {
    setInterval(loadNext, 2500);
});
