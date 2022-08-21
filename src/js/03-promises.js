import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    form: event.currentTarget
  };

  makingPromises(data);
});

function createPromise(position, delay) { //creating a resolve/reject logic, and randomize a solution about sucsess
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      };
    }, delay);
  });
};

function makingPromises(data){  //making promises chain from user input, delaing it, and making a notification
  let {form} = data;
 
  const elements = form.elements;
  const amount = parseInt(elements['amount'].value, 10);
  const delay = parseInt(elements['delay'].value, 10);
  const step = parseInt(elements['step'].value, 10);

  let currentDelay = delay;
  
  for (let i = 0; i < amount; i++){
    createPromise(i + 1, currentDelay)
    .then((data) => {
      const {position, delay} = data;
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
      { 
        position: 'top-right',
        timeout: 2000, 
        cssAnimationStyle: 'from-top',
        fontAwesomeIconStyle: 'shadow', 
      });
      })
      .catch((data) => {
        const {position, delay} = data;
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
        { 
          position: 'top-right',
          timeout: 2000, 
          cssAnimationStyle: 'from-top',
          fontAwesomeIconStyle: 'shadow', 
        });
      });
    currentDelay += step;
  };
};

