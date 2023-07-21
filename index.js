const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = timeInSeconds => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let intervalId;

  return seconds => {
    const updateTimer = () => {
      timerEl.textContent = formatTime(seconds);
      seconds--;

      if (seconds < 0) {
        clearInterval(intervalId);
      }
    };

    clearInterval(intervalId);
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  let cleanedValue = '';

  for (let i = 0; i < inputEl.value.length; i++) {
    if (!isNaN(Number(inputEl.value[i]))) {
      cleanedValue += inputEl.value[i];
    }
  }
  inputEl.value = cleanedValue;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  
  if (seconds) {
    animateTimer(seconds);
  }
  inputEl.value = '';
});

document.addEventListener('keydown', e => {
  const seconds = Number(inputEl.value);
  
  if (e.key === 'Enter' && seconds) {
    animateTimer(seconds);
    inputEl.value = '';
  }
});
