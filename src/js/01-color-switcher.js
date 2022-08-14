const refs = { //refs on the elements
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
};

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

let timerId;

function onStartClick(){ // logic of changing background color of Body element, setInterval on it,  and disabled start button to prevent multiply function start
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    refs.start.disabled = true;
    refs.stop.disabled = false;
};

function onStopClick(){ //clearing interval, and make start button exist again.
    clearInterval(timerId);

    refs.stop.disabled = true;
    refs.start.disabled = false;
};

function getRandomHexColor() {  //hex randomizer
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};