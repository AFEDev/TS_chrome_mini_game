const dog = document.querySelector('.dog');
const cat = document.querySelector('.cat');
document.addEventListener('keydown', function (event) {
    jump();
});
function jump() {
    if (!dog.classList.contains('jump')) {
        dog.classList.add('jump');
    }
    setTimeout(function () {
        dog.classList.remove('jump');
    }, 500);
}
let isDogAlive = setInterval(function () {
    let dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue('top'));
    let catLeft = parseInt(window.getComputedStyle(cat).getPropertyValue('left'));
    if (catLeft < 50 && catLeft > 0 && dogTop >= 140) {
        alert("GAME OVER!!!");
        cat.classList.remove("catGo");
        cat.classList.add("catGo");
    }
}, 10);
