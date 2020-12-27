"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var title = document.getElementById('title');
var authorLast = document.getElementById('authorLast');
var authorFirst = document.getElementById('authorFirst');
var goButton = document.getElementById('go');
var results = document.getElementById('results');
// on load, 
window.addEventListener('load', function (e) {
    e.preventDefault();
    getBooks()
        .then(function (data) { return setResults(data); })
        .catch(function (err) { return console.log(err.message); });
});
document.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.id !== "" && target.id !== 'title' && target.id !== 'authorLast' && target.id !== 'authorFirst' && target.id !== 'go') {
        tossBook(target.id);
        getBooks()
            .then(function (data) { return setResults(data); })
            .catch(function (err) { return console.log(err.message); });
    }
});
goButton.addEventListener('click', function () {
    if (getFormData() === undefined) {
        alert('each field must have a value');
        return;
    }
    else {
        addBook(getFormData());
        emptyFormDivs();
        getBooks()
            .then(function (data) { return setResults(data); })
            .catch(function (err) { return console.log(err.message); });
    }
});
function setResults(array) {
    if (array) {
        results.textContent = "";
        results.innerHTML = "<table></table>";
        array.map(function (book) {
            results.innerHTML += "<li id=" + book._id + "><strong>Title: </strong>" + book.title + "; <strong>Author: </strong>" + book.authorLast + ", " + book.authorFirst + "</li>";
        });
    }
}
function getFormData() {
    if (!title.value || !authorLast.value || !authorFirst.value) {
        return;
    }
    var formObj = {
        title: title.value.toString(),
        authorLast: authorLast.value.toString(),
        authorFirst: authorFirst.value.toString()
    };
    return formObj;
}
function getBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var find, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/books')];
                case 1:
                    find = _a.sent();
                    return [4 /*yield*/, find.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addBook(book) {
    if (!book) {
        return;
    }
    else {
        fetch('/books', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) { return console.log('data added: ', data); });
    }
}
function tossBook(id) {
    if (!id) {
        return;
    }
    else {
        fetch('/books/delete' + id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(function (res) { return res.json(); })
            .catch(function (err) { return console.log(err.message); });
    }
}
function emptyFormDivs() {
    title.value = '';
    authorLast.value = '';
    authorFirst.value = '';
}
