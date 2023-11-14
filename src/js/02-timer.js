import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let datetimePicker;

document.addEventListener('DOMContentLoaded', function () {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate <= currentDate) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        document.querySelector('button[data-start]').disabled = true;
      } else {
        document.querySelector('button[data-start]').disabled = false;
      }
    },
  };

  datetimePicker = flatpickr("#datetime-picker", options);

  document.querySelector("#datetime-picker").addEventListener('click', () => {
    datetimePicker.open();
  });

  document.querySelector('button[data-start]').addEventListener('click', () => {
    const selectedDate = datetimePicker.selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      startTimer(selectedDate);
    }
  });

  const timerContainer = document.querySelector('.timer');
  const fields = document.querySelectorAll('.field');

  timerContainer.style.display = 'flex';
  timerContainer.style.justifyContent = 'space-between';
  timerContainer.style.width = '30%';

  fields.forEach(field => {
    field.style.textAlign = 'center';
    field.style.flex = '1';
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.justifyContent = 'flex-start';
    field.style.gap = '5px';
  });

  const values = document.querySelectorAll('.value');
  const labels = document.querySelectorAll('.label');

  values.forEach(value => {
    value.style.fontSize = '2em';
    value.style.fontWeight = 'bold';
  });

  labels.forEach(label => {
    label.style.fontSize = '0.8em';
    label.style.color = '#555';
  });

function startTimer(endDate) {
  document.querySelector("#datetime-picker").disabled = true;
  
  document.querySelector('button[data-start]').disabled = true;

  const interval = setInterval(() => {
    const timeDifference = endDate - new Date();

    if (timeDifference < 0) {
      clearInterval(interval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown timer reached zero!',
      });
      document.querySelector("#datetime-picker").disabled = false;
      document.querySelector('button[data-start]').disabled = false;
    } else {
      const time = convertMs(timeDifference);

      document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
      document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
      document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
      document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
    }
  }, 1000);
}

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
});