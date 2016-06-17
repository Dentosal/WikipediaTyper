/*
** Copyright (c) 2016 Hannes Karppila
** Released under dual license:
** You can use either CC0 or the MIT license.
*/
function term(selector, scroll) {
    var scroll = typeof scroll !== 'undefined' ? scroll : true;
    return {
        print: function(string) {
            $(selector).html($(selector).html()+string.replace("\n", "<br>"));
            if (($(selector).html().match(/<br>/g) || []).length > 100) {
                $(selector).html($(selector).html().replace(/<br>.+?<br>/,"<br>"));
            }
            if (scroll) {
                $(selector).animate({"scrollTop": $(selector)[0].scrollHeight}, {duration: "fast", queue: false});
            }
            return this;
        },
        println: function(string) {
            term(selector).print(string+"\n");
            return this;
        },
        backspace: function() {
            var h = $(selector).html();
            if (h[h.length-1] !== ">") {
                $(selector).html(h.slice(0,h.length-1));
            }
            return this;
        },
        clear: function(string) {
            $(selector).html("");
            return this;
        }
    };
}
