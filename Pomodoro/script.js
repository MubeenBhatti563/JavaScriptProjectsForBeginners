const time = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop'); const reset = document.getElementById('reset');

let min = 24;
let second = 60;
let minCount = 0;
let secCount = 0;

let timeInterval = null;
let status = 'stopped';

function pomodoroWatch() {
    second--;
    if (second < 0) {
        second = 59;
        min--;
    }

    if (second < 10) {
        secCount = '0' + second.toString();
    } else {
        secCount = second;
    }

    if (min < 10) {
        minCount = '0' + min.toString();
    } else {
        minCount = min;
    }

    if (min < 0) {
        min = 24;
    }

    let displayTimer = time.innerText = minCount + ":" + secCount;

    if (min === 0 && second === 0) {
        clearInterval(timeInterval);
        status = 'stopped';
        time.innerText = "00:00";
        alert("Pomodoro session complete!"); // Or play a sound
    }
}

start.addEventListener('click', function () {
    if (status === 'stopped') {
        timeInterval = window.setInterval(pomodoroWatch, 1000);
        status = 'started';
    }
});

stop.addEventListener('click', function () {
    if (status === 'started') {
        window.clearInterval(timeInterval);
        status = 'stopped';
    }
});

reset.addEventListener('click', function () {
    if (timeInterval !== null) {
        window.clearInterval(timeInterval);
    }
    min = 24;
    second = 59;
    status = 'stopped';
    time.innerText = '25:00';
});