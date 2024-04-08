import { useState } from "react";
import { Play } from "./Play";
import { Restart } from "./Restart";
import { Currentplayer } from "./Currentplayer";

export default function App() {
  const [player1, setPlayer1] = useState("X");
  const [player2, setPlayer2] = useState("O");
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setwinner] = useState("");

  function handlepick(index) {
    if (board[index] === null && turn === "X") {
      const newBoard = [...board];
      newBoard[index] = player1;
      setBoard(newBoard);
      checkscore(newBoard);
      setTurn("O");
    } else if (board[index] === null && turn === "O") {
      const newBoard = [...board];
      newBoard[index] = player2;
      setBoard(newBoard);
      checkscore(newBoard);
      setTurn("X");
    }
  }
  function checkscore(board) {
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

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setwinner(board[a] === player1 ? "Player 1" : "Player 2");
        const intervalId = setInterval(() => {
          handleRestart();
          clearInterval(intervalId);
        }, 1000);
        return;
      }
    }

    if (!board.includes(null)) {
      setwinner("It's a tie!");
    }
  }
  if (board.every((cell) => cell)) {
    setwinner("It's a tie");
  }

  function handleRestart() {
    setPlayer1("X");
    setPlayer2("O");
    setTurn("X");
    setBoard(Array(9).fill(null));
    setwinner("");
  }

  return (
    <div className="container">
      <Currentplayer turn={turn} winner={winner} />
      <Play board={board} handlepick={handlepick} />
      <Restart onRestart={handleRestart} />
    </div>
  );
}
