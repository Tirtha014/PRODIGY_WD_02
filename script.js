let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.innerText = 'Stop';
        startStopBtn.style.backgroundColor = '#ffc107'; // Yellow for 'Stop'
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerText = 'Start';
        startStopBtn.style.backgroundColor = '#28a745'; // Green for 'Start'
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerText = '00:00:00';
    laps.innerHTML = '';
    startStopBtn.innerText = 'Start';
    startStopBtn.style.backgroundColor = '#28a745'; // Green for 'Start'
    lapCounter = 0;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.innerText = `Lap ${lapCounter}: ${display.innerText}`;
        laps.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
