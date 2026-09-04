const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getBoard = () => board;

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
            console.log(`Unable to place token at row ${row}, column ${column}. The cell is already filled!`);
        }
    };

    return { getBoard, clearBoard, placeToken };
})();