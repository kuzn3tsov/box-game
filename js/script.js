function game() {
    const boxes = [];
    const numberOfBoxes = 50;
    let score = 0;

    const scoreBoard = document.getElementById('scoreBoard');
    const gameArea = document.getElementById('gameArea');

    scoreBoard.textContent = 'Score: 0';
    gameArea.innerHTML = '';

    for (let i = 0; i < numberOfBoxes; i++) {
        const isGreen = Math.random() > 0.5;
        boxes.push({
            x: Math.random() * (gameArea.offsetWidth - 50),
            y: Math.random() * (gameArea.offsetHeight - 50),
            width: 50,
            height: 50,
            color: isGreen ? 'green' : 'red'
        });
    }

    for (let i = 0; i < boxes.length; i++) {
        setTimeout(function () {
            const box = boxes[i];
            const div = document.createElement('div');
            div.classList.add('box');
            div.style.left = box.x + 'px';
            div.style.top = box.y + 'px';
            div.style.width = box.width + 'px';
            div.style.height = box.height + 'px';
            div.style.backgroundColor = box.color;

            gameArea.appendChild(div);

            requestAnimationFrame(() => div.classList.add('show'));

            const timeOutId = setTimeout(function () {
                div.classList.remove('show');
                div.classList.add('hide');
                setTimeout(() => div.remove(), 500);
            }, 2000);

            div.addEventListener('click', function () {
                if (box.color === 'green') {
                    score++;
                } else {
                    score--;
                }
                scoreBoard.textContent = 'Score: ' + score;

                div.classList.remove('show');
                div.classList.add('hide');
                clearTimeout(timeOutId);
                setTimeout(() => div.remove(), 500);
            });
        }, (i + 1) * 1000);
    }

    setTimeout(function () {
        document.getElementById('playAgainButton').style.display = 'inline-block';
    }, (boxes.length + 1) * 1000 + 2000);
}

function setupButtons() {
    const startButton = document.getElementById('startButton');
    const playAgainButton = document.getElementById('playAgainButton');

    startButton.addEventListener('click', function () {
        startButton.style.display = 'none';
        playAgainButton.style.display = 'none';
        game();
    });

    playAgainButton.addEventListener('click', function () {
        playAgainButton.style.display = 'none';
        game();
    });
}


window.onload = setupButtons;



