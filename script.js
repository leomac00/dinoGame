//general variables
const { log } = console;
const dino = document.querySelector(`.dino`);
const background = document.querySelector(`.background`);
const body = document.querySelector(`body`);
const initialBodyHTML = body.innerHTML;

//states
const dinoState = {
	isJumping: false,
	position: 0,
};

//functions
const handleKeyUp = (e) => {
	if (e.keyCode === 32 && !dinoState.isJumping) {
    jump();
    log (`pulou`)
  }
};

const jump = () => {
	dinoState.isJumping = true;

	let upInterval = setInterval(() => {
		if (dinoState.position >= 150) {
			clearInterval(upInterval);
			let downInterval = setInterval(() => {
				if (dinoState.position <= 0) {
					clearInterval(downInterval);
					dinoState.isJumping = false;
				} else {
					dinoState.position -= 20;
					dino.style.bottom = dinoState.position + 'px';
				}
			}, 20);
		} else {
			dinoState.position += 20;
			dino.style.bottom = dinoState.position + 'px';
		}
	}, 20);
};

const createCactus = () => {
	const cactus = document.createElement(`div`);
	let cactusPosition = 1000;
	let randomTime = Math.random() * 6000;

	cactus.classList.add(`cactus`);
	cactus.style.left = 1000 + `px`;
	background.appendChild(cactus);

	const leftInterval = setInterval(() => {
		if (cactusPosition <= -60) {
			clearInterval(leftInterval);
			background.removeChild(cactus);
			log('cactus saiu da tela');
		} else if (
			cactusPosition > 0 &&
			cactusPosition < 60 &&
			dinoState.position < 60
		) {
			clearInterval(leftInterval);
      body.innerHTML = 
      `<div className="game-over">
      <h1>FIM DE JOGO</h1>
      <button onClick='location.reload()'>Recomeçar</button>
      </div>`;
		} else {
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';
		}
	}, 20);

	setTimeout(createCactus, randomTime);
};

//Game Run
createCactus();
document.addEventListener(`keyup`, handleKeyUp);

