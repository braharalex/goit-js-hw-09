const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
}

refs.startBtn.addEventListener('click', replaceBgColor);
refs.stopBtn.addEventListener('click', stopReplaceBgColor);

let intervalBgColor = null;

function replaceBgColor() {
  refs.startBtn.disabled = true;
  intervalBgColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopReplaceBgColor() {
  clearInterval(intervalBgColor);
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
