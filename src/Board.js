import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { render } from "@testing-library/react";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({ length: nrows }).map((row) =>
      Array.from({ length: ncols }).map(
        (cell) => Math.random() < chanceLightStartsOn
      )
    );
  }
  /** Returns true if all board cells have false value. */
  function hasWon(board) {
    return board.every((row) => row.every((cell) => cell === false));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = oldBoard.map((row) => [...row]);

      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);

      return newBoard;
    });
  }

  const renderTable = [];

  for (let i = 0; i < board.length; i++) {
    let renderRows = [];
    for (let j = 0; j < board[i].length; j++) {
      let coord = `${i}-${j}`;
      renderRows.push(
        <Cell
          key={coord}
          isLit={board[i][j]}
          flipCellsAroundMe={(evt) => flipCellsAround(coord)}
        />
      );
    }
    renderTable.push(<tr key={i}>{renderRows}</tr>);
  }

  // if the game is won, just show a winning msg & render nothing else
  return (
    <table>
      <tbody>{hasWon(board) ? "You win!" : renderTable}</tbody>
    </table>
  );
}

export default Board;
