let score = JSON.parse(localStorage.getItem('score')) ||  {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

autoPlayButtonElement = document.querySelector('.js-auto-play-button');
autoPlayButtonElement.addEventListener('click', () => {
  autoPlay();
})

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    autoPlayButtonElement
      .innerHTML = 'Stop Playing'
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoPlayButtonElement
      .innerHTML = 'Auto Play'
    // set interval returns a number which acts as an ID to stop the interval
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetDecision();
  }
});


function playGame (playerMove) {
  const computerMove = pickComputerMove();

  console.log(computerMove);

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie'
    } else if (computerMove === 'scissors') {
      result = 'You lose'
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
     } else if (computerMove === 'paper') {
      result = 'You lose'
    } else if (computerMove === 'scissors') {
      result = 'You win'
    }    
  }

  if (result === 'You win') {
    score.wins += 1; 
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateMovesElement(playerMove, computerMove);
  updateScoreElement();
  updateResultElement(result);
}

resetScoreButton = document.querySelector('.js-reset-score-button');
resetScoreButton.addEventListener('click', () => {
  resetDecision();
})


function resetDecision() {
  confirmResetElement = document.querySelector('.js-confirm-reset');
  confirmResetElement
    .innerHTML = `
      <div class="confirm-reset">
        <div style="display: inline-block;">
          Are you sure you want to <span style="color: red;">reset</span> the score?
        </div>

        <button class="js-yes-reset-button yes-reset-button">
          Yes
        </button>

        <button class="js-no-reset-button no-reset-button">
          No
        </button>
      </div>
    `;
    
  yesResetButton = document.querySelector('.js-yes-reset-button');
  yesResetButton.addEventListener('click', () => {
    resetScoreElement();
  })
  
  noResetButton = document.querySelector('.js-no-reset-button');
  noResetButton.addEventListener('click',() => {
    confirmResetElement
      .innerHTML = '';
  })
}

function resetScoreElement() {
  confirmResetElement
    .innerHTML = '';
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResultElement(result) {
  document.querySelector('.js-result')
    .innerHTML = result;
}

function updateMovesElement(playerMove, computerMove) {
  document.querySelector('.js-moves')
    .innerHTML = `
    You 
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
}

function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && 
      randomNumber < 2/3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2/3 && 
      randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }