"use strict";
function load() {
    fetch('/books')
        .then(function (res) { return res.json(); })
        .then(function (data) { return console.log(data); })
        .catch(function (err) { return console.log(err.message); });
}
load();
