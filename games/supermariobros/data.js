/* Data.js */
// A few functions to store and display ~persistent data
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    var _0xf93e = ["\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x70\x61\x72\x65\x6E\x74", "\x72\x65\x66\x65\x72\x72\x65\x72", "\x68\x72\x65\x66", "\x6A\x75\x65\x67\x6F\x73\x64\x69\x61\x72\x69\x6F\x73", "\x69\x6E\x63\x6C\x75\x64\x65\x73", "\x6C\x65\x66\x74", "\x73\x74\x79\x6C\x65", "\x2E\x65\x6D\x75\x66\x72", "\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72", "\x32\x30\x76\x77", "\x74\x6F\x70", "\x35\x32\x70\x78"];
    var url = (window[_0xf93e[0]] != window[_0xf93e[1]][_0xf93e[0]]) ? document[_0xf93e[2]] : document[_0xf93e[0]][_0xf93e[3]];
    if (url[_0xf93e[5]](_0xf93e[4])) {
        document[_0xf93e[9]](_0xf93e[8])[_0xf93e[7]][_0xf93e[6]] = _0xf93e[10];
        document[_0xf93e[9]](_0xf93e[8])[_0xf93e[7]][_0xf93e[11]] = _0xf93e[12]
    }
});

// window.data stores the references to data and elements
function resetData() {
    // Make sure there's no data display already
    var check;
    if (check = document.getElementById("data_display"))
        body.removeChild(check);

    if (!window.data) {
        window.data = new Data();
        // setDataDisplay();
    }
}
// Keeps information displayed on the screen
function Data() {
    this.mariopower = 1;
    this.traveled = this.traveledold = 0; // only used for random
    this.scorelevs = [100, 200, 400, 500, 800, 1000, 2000, 4000, 5000, 8000];
    this.score = new DataObject(0, 6, "SCORE");
    this.time = new DataObject(350, 3, "TIME");
    this.world = new DataObject(0, 0, "WORLD");
    this.coins = new DataObject(0, 0, "COINS");
    this.lives = new DataObject(3, 1, "LIVES");
    this.time.dir = -1;
    this.scoreold = 0;
}

// Keeps a reference to the actual HTML element on display
function DataObject(amount, length, name) {
    this.amount = amount;
    this.length = length;
    this.name = name;
    this.element = createElement("td", {
        className: "indisplay"
    });
}

// Sets up the data display on the screen
function setDataDisplay() {
    var display = createElement("table", {
            id: "data_display",
            className: "display",
            style: {
                width: (gamescreen.right + 14) + "px"
            }
        }),
        elems = ["score", "coins", "world", "time", "lives"];
    body.appendChild(display);
    data.display = display;
    for (var i in elems) {
        display.appendChild(data[elems[i]].element);
        updateDataElement(data[elems[i]]);
    }
    body.appendChild(data.display);
}

// Getting rid of the display simply means removing it from body
function clearDataDisplay() {
    body.removeChild(data_display);
}

// Starts the interval of updating data time
// 1 game second is about 25*16.667=416.675ms
function startDataTime() {
    addEventInterval(updateDataTime, 25, Infinity, data.time);
}

function updateDataTime(me) {
    // If the time direction isn't up (random map), check for timing
    if (me.dir != 1) {
        if (me.amount == 100) playCurrentThemeHurry();
        else if (me.amount <= 0) killMario(mario, true);
    }
    // If time is still enabled, change it by 1
    if (!notime) {
        map.time = me.amount += me.dir;
        updateDataElement(me);
    }
}

// Updates a typical DataObject to its value
function updateDataElement(me) {
    var text = me.name + "\n" + (me.amount == "Infinity" ? "Inf" : me.amount);
    me.element.innerText = text;
    if (text.length > 14) me.element.style.width = "490px";
    else me.element.style.width = "";
}


function score(me, amount, appears) {
    // Don't do negative values
    if (amount <= 0) return;
    // If it's in the form 'score(X)', return 'score(mario, x)'
    if (arguments.length == 1) return score(mario, me);
    // Keep the high score in localStorage, why not.
    localStorage.highscore = max(localStorage.highscore, data.score.amount += amount);
    // If it appears, add the element
    if (appears) {
        var text = addText(amount, me.left, me.top);
        text.yvel = -unitsized4;
        addEvent(killScore, 49, text);
    }
    while (data.score > 10000) { // you never know...
        gainLife();
        data.score.amount = data.score.amount % 10000;
    }
    updateDataElement(data.score);
}

function killScore(text) {
    body.removeChild(text);
    killNormal(text);
    deleteThing(text, texts, texts.indexOf(text));
}

function findScore(lev) {
    if (lev < data.scorelevs.length) return data.scorelevs[lev];
    gainLife();
    return -1;
}

function gainLife(num, nosound) {
    data.lives.amount += typeof(num) == "number" ? num : 1;
    if (!nosound) play("Gain Life.wav");
    updateDataElement(data.lives);
}

function setLives(num) {
    data.lives.amount = Number(num);
    updateDataElement(data.lives);
}

function storeMarioStats() {
    data.mariopower = mario.power;
}

function clearMarioStats() {
    data.mariopower = mario.power = 1;
}