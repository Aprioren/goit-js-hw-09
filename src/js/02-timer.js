import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    start: document.querySelector('button[data-start]'),
    values: document.querySelectorAll('.field > .value'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.start.addEventListener('click', onStartClick);
// refs.start.disabled = true;

let selectedDate = null; //variable to save Date that user pick

function onStartClick (){ //making a backCountDown between a date now, and chosen date from user, also make it visible in the HTML 
    refs.start.disabled = true;
    const backCount = setInterval(()=>{
    const chosenData = new Date(selectedDate) - new Date();
    const countStart = convertMs(chosenData);

    onStartCount(countStart);

    if(chosenData <= 0){
        clearInterval(backCount);
        refs.values.forEach(element => element.textContent = '00');
    } 

    }, 1000);
};


flatpickr('#datetime-picker', {                             //let user chose a date, also a time, making imposible to chose date earler than date.now 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if(selectedDates[0] <= Date.now()){
            refs.start.disabled = true;

            Notiflix.Notify.failure("Please choose a date in the future",
            { 
                position: 'center-top',
                timeout: 2000, 
                cssAnimationStyle: 'from-top',
                fontAwesomeIconStyle: 'shadow', 
            });

        } else {
            refs.start.disabled = false;
        };
        selectedDate = selectedDates[0];
    },
});

function addLeadingZero(value){  //adding a one more zero befoure a number less then 10
    return String(value).padStart(2, '0');
};

function convertMs(ms) {  //Function make a days, hours, minutes, seconds from date
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

function onStartCount(event){
    refs.days.textContent = addLeadingZero(event.days);
    refs.hours.textContent = addLeadingZero(event.hours);
    refs.minutes.textContent = addLeadingZero(event.minutes);
    refs.seconds.textContent = addLeadingZero(event.seconds);
}