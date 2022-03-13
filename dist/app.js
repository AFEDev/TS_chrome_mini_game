import { countTimer } from "../dist/timer.js";
const dog = document.querySelector('.dog');
const cat = document.querySelector('.cat');
const button = document.querySelector('button');
const score = document.getElementById('top');
const timerEl = document.getElementById('score');
document.addEventListener('keydown', function () {
    jump();
});
document.addEventListener('touchstart', function () {
    jump();
});
button.addEventListener('click', function () {
    startGame();
});
function startGame() {
    countTimer.timer("reset");
    countTimer.timer("start");
    button.style.display = 'none';
    dog.classList.add('dogGo');
    dog.style.animationPlayState = "running";
    cat.style.animation = 'none';
    cat.offsetWidth;
    cat.style.animation = 'catMove 1.5s infinite linear';
    score.innerHTML = localStorage.getItem("score");
}
function jump() {
    if (!dog.classList.contains('jump')) {
        dog.classList.add('jump');
    }
    setTimeout(function () {
        dog.classList.remove('jump');
    }, 500);
}
const isDogAlive = setInterval(function () {
    let dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue('top'));
    let catLeft = parseInt(window.getComputedStyle(cat).getPropertyValue('left'));
    if (catLeft < 60 && catLeft > 0 && dogTop >= 140) {
        countTimer.timer("stop");
        const currentScore = timerEl.innerHTML;
        if (parseInt(localStorage.getItem("score")) <= parseInt(currentScore) || !localStorage.getItem("score")) {
            localStorage.setItem("score", currentScore);
            score.innerHTML = localStorage.getItem("score");
        }
        cat.style.animationPlayState = "paused";
        dog.style.animationPlayState = "paused";
        button.style.display = '';
    }
}, 10);
