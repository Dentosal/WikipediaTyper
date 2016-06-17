var cutEdge = (typeof(Storage) !== "undefined") && 'serviceWorker' in navigator;
var pageQueue = ["philosophy"];
var displayContent = "";
var displayQueue = [];
var visitedPages = [];
var loading = false;

function normalizeTitle(title) {
    return title.replace(" ", "_");
}

function loadNext() {
    loading = true;
    if (pageQueue.length === 0) {
        console.log("EMPTY?!");
    }
    var title = normalizeTitle(pageQueue.splice(Math.random()*pageQueue.length, 1)[0]);
    visitedPages.push(title);

    $.get("https://en.wikipedia.org/api/rest_v1/page/summary/"+title+"?redirect=true").done(function(data) {
        _.each(data.extract, function(char) {
            console.log("GOOD");
            displayQueue.unshift(char); // push to beginning
        })
        loading = false;
    }, "JSON");

    if (pageQueue.length < 1000) {
        $.get("https://en.wikipedia.org/api/rest_v1/page/related/"+title+"?redirect=true").done(function(data) {
            //console.log(_.pluck(data.items, "title"));
            _.each(_.pluck(data.items, "title"), function(title) {
                var t = normalizeTitle(title);
                if (!(_.contains(visitedPages, t) || _.contains(displayQueue, t))) {
                    pageQueue.push(t);
                }
            })
        }, "JSON");
    }
}

function update() {
    if (displayQueue.length < 10 && !loading) {
        loadNext();
    }
    if (displayQueue.length > 0) {
        displayContent += displayQueue.pop();
    }
    $("#content").html(displayContent);
}


$(document).ready(function() {
    loadNext();
    setInterval(update, 200);
});
