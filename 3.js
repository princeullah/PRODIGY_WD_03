  const board = document.getElementById('board');
    const statusDiv = document.getElementById('status');
    let cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
          gameActive = false;
          statusDiv.textContent = `Player ${cells[a].textContent} wins! 🏆`;
          return;
        }
      }

      if ([...cells].every(cell => cell.textContent)) {
        gameActive = false;
        statusDiv.textContent = "It's a draw! 🤝";
      }
    }

    function handleClick(e) {
      const cell = e.target;
      if (!gameActive || cell.textContent) return;
      cell.textContent = currentPlayer;
      checkWinner();
      if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    function createBoard() {
      board.innerHTML = '';
      cells = [];
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', handleClick);
        cells.push(cell);
        board.appendChild(cell);
      }
    }

    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;
      statusDiv.textContent = "Player X's turn";
      createBoard();
    }

    createBoard();