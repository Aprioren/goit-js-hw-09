import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    start: document.querySelector('button[data-start]'),
    values: document.querySelectorAll('.field > .value')
};

refs.start.addEventListener('click', onStartClick);
refs.start.disabled = true;

let selectedDate = null; //variable to save Date that user pick

function onStartClick (){ //making a backCountDown between a date now, and chosen date from user, also make it visible in the HTML 
    const backCount = setInterval(()=>{
    const chosenData = new Date(selectedDate) - new Date();
    const countStart = convertMs(chosenData);

    refs.values[0].textContent = addLeadingZero(countStart.days);
    refs.values[1].textContent = addLeadingZero(countStart.hours);
    refs.values[2].textContent = addLeadingZero(countStart.minutes);
    refs.values[3].textContent = addLeadingZero(countStart.seconds);

    if(chosenData <= 0){
        refs.values.foreach(element => element.textContent = '00')
        clearInterval(backCount);
    };

    }, 1000);
};


flatpickr('#datetime-picker', 
    {                             //let user chose a date, also a time, making imposible to chose date earler than date.now 
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
        console.log(selectedDates[0]);
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