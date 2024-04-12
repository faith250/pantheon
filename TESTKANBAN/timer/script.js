window.addEventListener('DOMContentLoaded', function() {
    const timersContainer = document.getElementById('timersContainer');
    const timerForm = document.getElementById('timerForm');

    timerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const timerLabelInput = document.getElementById('timerLabel');
        const timerDurationInput = document.getElementById('timerDuration');

        const label = timerLabelInput.value.trim();
        const duration = parseInt(timerDurationInput.value.trim());

        if (label && !isNaN(duration) && duration > 0) {
            addTimer(label, duration);
            timerLabelInput.value = '';
            timerDurationInput.value = '';
        } else {
            alert('Please enter valid label and duration (in minutes) for the timer.');
        }
    });

    function addTimer(label, duration) {
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        timerElement.innerHTML = `
            <h2>${label}</h2>
            <div class="time-display">
                <span class="minutes">${padTime(duration)}</span>:<span class="seconds">00</span>
            </div>
            <div class="buttons">
                <button class="startBtn">Start</button>
                <button class="pauseBtn">Pause</button>
                <button class="resetBtn">Reset</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;
        timersContainer.appendChild(timerElement);

        const startBtn = timerElement.querySelector('.startBtn');
        const pauseBtn = timerElement.querySelector('.pauseBtn');
        const resetBtn = timerElement.querySelector('.resetBtn');
        const deleteBtn = timerElement.querySelector('.deleteBtn');
        const minutesDisplay = timerElement.querySelector('.minutes');
        const secondsDisplay = timerElement.querySelector('.seconds');

        let seconds = 0;
        let timer;

        startBtn.addEventListener('click', function() {
            if (!timer) {
                timer = setInterval(() => {
                    if (seconds === 0) {
                        if (duration === 0) {
                            clearInterval(timer);
                            timer = null;
                            alert("Time's up!");
                            return;
                        }
                        duration--;
                        seconds = 59;
                    } else {
                        seconds--;
                    }

                    minutesDisplay.textContent = padTime(duration);
                    secondsDisplay.textContent = padTime(seconds);
                }, 1000);
            }
        });

        pauseBtn.addEventListener('click', function() {
            clearInterval(timer);
            timer = null;
        });

        resetBtn.addEventListener('click', function() {
            clearInterval(timer);
            timer = null;
            duration = parseInt(minutesDisplay.textContent);
            seconds = 0;
            minutesDisplay.textContent = padTime(duration);
            secondsDisplay.textContent = padTime(seconds);
        });

        deleteBtn.addEventListener('click', function() {
            timersContainer.removeChild(timerElement);
        });
    }

    function padTime(time) {
        return time < 10 ? "0" + time : time;
    }
});
