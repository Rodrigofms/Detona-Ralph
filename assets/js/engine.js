const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameSpeed: 1000,
    hitPosition: 0,
    finalScore: 0,
    currentTime: 31,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countdownTimerId: setInterval(countdown, 1000),
  }
};

function countdown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  switch (state.values.currentTime) {
    case 1:
      playsound("Game_Over");
      break
  }
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countdownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O Seu resultado foi: " + state.values.finalScore);
  }
}

function playsound(audioName) {
  let audio = new Audio(`/assets/media/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.finalScore++;
        state.view.score.textContent = state.values.finalScore;
        state.values.hitPosition = null;
        playsound("hit");
      }
    });
  });
}

function reiniciar(){
  location.reload();
}

function redirecionar(){
  open("https://github.com/Rodrigofms");
}

function main() {
  addListenerHitBox();
}

main();