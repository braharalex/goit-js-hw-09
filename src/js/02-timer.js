import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;
const refs = {
  picker: document.querySelector('#datetime-picker'),
  StartBtn: document.querySelector('[data-start]'),
  daysVal: document.querySelector('[data-days]'),
  hoursVal: document.querySelector('[data-hours]'),
  minutesVal: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.StartBtn.disabled = true;
refs.StartBtn.addEventListener('click', startTimer);

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log();
    if (selectedDates[0] - Date.now() <= 60000) {
      Notify.failure('Please choose a date in the future');
      refs.StartBtn.disabled = true;
      return;
    }
    refs.StartBtn.disabled = false;
  },
});

function startTimer(e) {
  refs.picker.disabled = true;
  e.target.disabled = true;

  const endTime = new Date(refs.picker.value);
  const beginningTime = Date.now();
  let timerTime = endTime - beginningTime;

  setTime(convertMs(timerTime));

  intervalId = setInterval(() => {
    if (timerTime < 1000) {
      clearInterval(intervalId);
      refs.picker.disabled = false;
      return;
    }

    timerTime -= 1000;
    setTime(convertMs(timerTime));
  }, 1000);
}

function setTime({ days, hours, minutes, seconds }) {
  refs.daysVal.textContent = addLeadingZero(days);
  refs.hoursVal.textContent = addLeadingZero(hours);
  refs.minutesVal.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
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
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
