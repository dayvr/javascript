"use strict";

function digitalClock() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let timeFormat = hour >= 12 ? "PM" : "AM";

    hour = hour % 12; // Change the hours to a 12-hour format
    hour = hour ? hour : 12;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("format").innerText = `${timeFormat}`;
    document.getElementById("hour").innerText = `${hour}:${minutes}`;
    document.getElementById("seconds").innerText = `${seconds}`;
    document.getElementById("weekDay").innerText = wDay(date);
    document.getElementById("date").innerText = displayDate(date);

    return setTimeout(function () { digitalClock() }, 1000);
}

function wDay(d) {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Thursday", "Wednesday", "Friday", "Saturday"];
    return weekDays[d.getDay()];
}

function displayDate(d) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    return `${month} ${day}, ${year}`;
}

digitalClock();