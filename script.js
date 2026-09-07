const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getRows = () => rows;
    const getColumns = () => columns;

    const getBoard = () => board;
    const printBoard = () => console.log(board);

    const clearBoard = () => {
        for (let r = 0; r < rows; r++)
        {
            for (let c = 0; c < columns; c++)
            {
                board[r][c] = "";
            }
        }
    }

    const placeToken = (row, column, player) => {
        if (board[row][column] === "")
        {
            board[row][column] = player.token;
        }
        else
        {
            console.log(`Unable to place token at row ${row + 1}, column ${column + 1}. The cell is already filled!`);
        }
    };

    const areSquaresEmpty = () => {
        for (let r = 0; r < rows; r++)
        {
            for (let c = 0; c < columns; c++)
            {
                if (board[r][c] === "")
                {
                    return true;
                }
            }
        }
        return false;
    }

    const checkWinner = (player) => {
        // Check rows
        for (let r = 0; r < rows; r++)
        {
            if (board[r][0] === board[r][1] 
                && board[r][1] === board[r][2] 
                && board[r][0] === player.token)
                {
                    return player;
                }
        }

        // Check columns
        for (let c = 0; c < columns; c++)
        {
            if (board[0][c] === board[1][c]
                && board[1][c] === board[2][c]
                && board[0][c] === player.token)
                {
                    return player;
                }
        }

        // Check diagonals
        if (board[0][0] === board[1][1]
            && board[1][1] === board[2][2]
            && board[0][0] === player.token)
            {
                return player;
            }
        if (board[0][2] === board[1][1]
            && board[1][1] === board[2][0]
            && board[0][2] === player.token)
            {
                return player;
            }

        // Otherwise, no winner
        return null;
    }

    return { getRows, getColumns, getBoard, printBoard, clearBoard, placeToken, areSquaresEmpty, checkWinner };
})();

function createPlayer(name, token)
{
    return { name, token };
}

const gameController = (() => {
    const playerOne = createPlayer("p1", "X");
    const playerTwo = createPlayer("p2", "O");
    let activePlayer = playerOne;
    let winner = null;
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");

    playerOneName.addEventListener("change", (e) => playerOne.name = e.target.value);
    playerTwoName.addEventListener("change", (e) => playerTwo.name = e.target.value);

    const resetGame = () => {
        gameBoard.clearBoard();
        displayController.updateDisplay();
        activePlayer = playerOne;
        winner = null;
    };

    const swtichActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const playRound = (row, column) => {
        if (row > 0 
            && row <= gameBoard.getRows() 
            && column > 0 
            && column <= gameBoard.getColumns())
        {
            // since the array is zero-indexed,
            // we want the row and column input to match.
            gameBoard.placeToken(row - 1, column - 1, activePlayer);
            winner = gameBoard.checkWinner(activePlayer);
            swtichActivePlayer();
            displayController.updateDisplay();
        }
        else
        {
            console.log("Row and column inputs must be between 1 and 3!");
        }

        if (isWinner())
        {
            console.log(`${winner.name} is the winner!`);
            return;
        }

        if (!gameBoard.areSquaresEmpty())
        {
            console.log("It's a tie!");
            return;
        }

    }

    const isWinner = () => {
        return winner !== null;
    }

    return { resetGame, playRound }
})();

const displayController = (() => {
    const boardDisplay = document.querySelector("#board");
    const boardCells = document.querySelectorAll("#board div");

    const updateDisplay = () => {
        const flattenedBoard = gameBoard.getBoard().flat();
        for (let i = 0; i < boardDisplay.children.length; i++)
        {
            const cell = boardDisplay.children[i];
            cell.textContent = flattenedBoard[i];
            if (flattenedBoard[i] === "X")
            {
                cell.style.color = "red";
            }
            else if (flattenedBoard[i] === "O")
            {
                cell.style.color = "blue";
            }

        }
    };

    let row = 1;
    let column = 1;
    for (const cell of boardCells)
    {
        const cellRow = row;
        const cellColumn = column;
        cell.addEventListener("click", (e) => {
            if (e.target.textContent === "")
            {
                gameController.playRound(cellRow, cellColumn);
            }
        });

        if (column === gameBoard.getRows())
        {
            row++;
            column = 1;
        }
        else
        {
            column++;
        }
    }

    return { updateDisplay };
})();