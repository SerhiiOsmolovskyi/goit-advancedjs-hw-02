import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const stepInput = document.querySelector('input[name="step"]');
    const amountInput = document.querySelector('input[name="amount"]');

    const firstDelay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    for (let i = 1; i <= amount; i++) {
      createPromise(i, firstDelay + (i - 1) * step)
        .then(({ position, delay }) => {
          iziToast.success({
            title: 'Fulfilled',
            message: `Promise ${position} fulfilled in ${delay}ms`,
            position: 'topRight',
          });
        })
        .catch(({ position, delay }) => {
          iziToast.error({
            title: 'Rejected',
            message: `Promise ${position} rejected in ${delay}ms`,
            position: 'topRight',
            });
        });
      }
      delayInput.value = '';
      stepInput.value = '';
      amountInput.value = '';
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});