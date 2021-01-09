class TicTacToe {
  constructor(board, cells) {
    this.board = board;
    this.cells = cells;
    this.xTurn = true;
    this.endgameModal = document.querySelector('.endgame-modal');
    this.endgameText = document.querySelector('.endgame-text');
    this.restartBtn = document.querySelector('.btn--restart');
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.cells.forEach(cell =>
      cell.addEventListener('click', this.handleClick.bind(this))
    );

    this.startGame();
  }

  startGame() {
    this.xTurn = true;
    this.setBoardHoverState();
    this.endgameModal.classList.remove('show');
    this.cells.forEach(cell => {
      cell.classList.remove('x');
      cell.classList.remove('o');
    });
    this.restartBtn.addEventListener('click', this.startGame.bind(this));
  }

  setBoardHoverState() {
    this.board.classList.remove('x');
    this.board.classList.remove('o');

    this.xTurn ? this.board.classList.add('x') : this.board.classList.add('o');
  }

  handleClick(e) {
    console.log('clicked');
    if (e.target.classList.contains('x') || e.target.classList.contains('o'))
      return;

    const cell = e.target;
    const currentClass = this.xTurn ? 'x' : 'o';
    this.placeMark(cell);
    if (this.declaredWinner(currentClass)) {
      this.endGame(false);
    } else if (this.declaredDraw()) {
      this.endGame(true);
    } else {
      this.swapTurns();
      this.setBoardHoverState();
    }
  }

  placeMark(cell) {
    this.xTurn ? cell.classList.add('x') : cell.classList.add('o');
  }

  swapTurns() {
    this.xTurn = !this.xTurn;
  }

  declaredWinner(currentClass) {
    return this.winningCombinations.some(combination => {
      return combination.every(index => {
        return this.cells[index].classList.contains(currentClass);
      });
    });
  }

  declaredDraw() {
    return [...this.cells].every(cell => {
      return cell.classList.contains('x') || cell.classList.contains('o');
    });
  }

  endGame(draw) {
    this.endgameModal.classList.add('show');

    if (draw) {
      this.endgameText.textContent = `It's a draw!`;
    }

    if (!draw) {
      this.endgameText.textContent = `${this.xTurn ? `X's` : `O's`} wins!`;
    }
  }
}

const gameBoard = document.querySelector('.game-board');
const gameCells = document.querySelectorAll('.cell');

const ticTacToe = new TicTacToe(gameBoard, gameCells);
