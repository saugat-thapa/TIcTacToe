'using strict';

let active = true;
let player = 'X';
let state = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `${player} has won!`;
const drawMessage = () => `Draw!`;
const turn = () => `${player}'s turn`;

const show = document.querySelector('.game--status');
show.textContent = turn();

function cellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellNumber = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (state[clickedCellNumber] !== '' || !active) {
    return;
  }

  cellPlayed(clickedCell, clickedCellNumber);
  resultCheck();
}

document
  .querySelectorAll('.cell')
  .forEach(cell => cell.addEventListener('click', cellClick));

function cellPlayed(clickedCell, clickedCellNumber) {
  state[clickedCellNumber] = player;
  clickedCell.textContent = player;
}

function resultCheck() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = state[winCondition[0]];
    let b = state[winCondition[1]];
    let c = state[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    show.textContent = winningMessage();
    active = false;
    document.body.style.background = 'rgb(4, 161, 4)';
    document.querySelector('h1').style.color = 'rgb(184, 184, 41)';
    document.querySelector('.game--status').style.color = 'rgb(184, 184, 41)';
    document.querySelectorall('.cell').style.color = 'rgb(4, 161, 4)';
    return;
  }

  let roundDraw = !state.includes('');
  if (roundDraw) {
    show.textContent = drawMessage();
    active = false;
    document.body.style.background = 'rgb(4, 161, 4)';
    document.querySelector('h1').style.color = 'rgb(184, 184, 41)';
    document.querySelector('.game--status').style.color = 'rgb(184, 184, 41)';
    document.querySelectorall('.cell').style.color = 'rgb(4, 161, 4)';

    return;
  }

  switchPlayer();
}
function switchPlayer() {
  player = player === 'X' ? 'O' : 'X';
  show.textContent = turn();
}

function restartGame() {
  active = true;
  player = 'X';
  state = ['', '', '', '', '', '', '', '', ''];
  show.textContent = turn();
  document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
  document.body.style.background = 'rgb(184, 184, 41)';
  document.querySelector('h1').style.color = 'rgb(4, 161, 4)';
  document.querySelector('.game--status').style.color = 'rgb(4, 161, 4)';
  document.querySelectorall('.cell').style.color = 'rgb(4, 161, 4)';
}

document.querySelector('.game--restart').addEventListener('click', restartGame);
