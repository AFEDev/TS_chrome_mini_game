import { countTimer } from "../dist/timer.js";


const dog = document.querySelector('.dog') as HTMLElement;
const cat = document.querySelector('.cat') as HTMLElement;
const button = document.querySelector('button') as HTMLButtonElement;
const score = document.getElementById('top') as HTMLElement;
const timerEl = document.getElementById('score');


/**
 * check windows size to make game responsible.
 */

const reportWindowSize = () => {
    let windowWidth = window.innerWidth;
    let gameContainer = document.getElementById('game')
    if (windowWidth >= 600) {
        gameContainer.style.width = '600px'
    } else {
        gameContainer.style.width = windowWidth + 'px'
    }

}

/** 
 * checks size of device screen
 */

window.addEventListener('resize', reportWindowSize)

let gameStarted: boolean;

/** 
 * interact with keybord by pressing any key
 */
document.addEventListener<'keydown'>('keydown', function (): void {
    gameStarted && jump();
})

/** Interact with mobile devices with touchscreen */

document.addEventListener('touchstart', function (): void {
    gameStarted && jump();
})

/**
 * Starts game by pushing button
 */

button.addEventListener('click', function (): void {
    gameStarted = true;
    startGame();

})




const randomCat = () => {
    let startTheCat = Math.random() + 1
    cat.style.animation = `catMove ${startTheCat}s infinite linear`;
    console.log(startTheCat);

}

function startGame(): void {
    countTimer.timer("reset");
    countTimer.timer("start");
    button.style.display = 'none';
    dog.classList.add('dogGo');
    dog.style.animationPlayState = "running";
    cat.style.animation = 'none';
    cat.offsetWidth;
    randomCat()
    score.innerHTML = localStorage.getItem("score")
}




/**
 * Starts "jump" animation, by adding .jump class. Timer fnc remove class after seted intervall of time to make 'jump' possible more then one time.
 */

function jump(): void {
    if (!dog.classList.contains('jump')) {
        dog.classList.add('jump')
    }
    setTimeout(function () {
        dog.classList.remove('jump')
    }, 500)
}

/**
 * Fnc that check if dog didn't toch the chat. It's get objects positinions on interval of time and check if they didnt touch each other. 
 */

const isDogAlive = setInterval(function (): void {
    let dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue('top'));
    let catLeft = parseInt(window.getComputedStyle(cat).getPropertyValue('left'));


    if (catLeft < 60 && catLeft > 0 && dogTop >= 140) {
        countTimer.timer("stop");

        gameStarted = false;

        const currentScore = timerEl.innerHTML;

        if (parseInt(localStorage.getItem("score")) <= parseInt(currentScore) || !localStorage.getItem("score")) {
            localStorage.setItem("score", currentScore)
            score.innerHTML = localStorage.getItem("score")
        }

        cat.style.animationPlayState = "paused";
        dog.style.animationPlayState = "paused";
        button.style.display = '';
    }
    if (catLeft < -40) {

        cat.style.animation = 'none';
        cat.offsetWidth;
        randomCat()

    }

}, 10)

