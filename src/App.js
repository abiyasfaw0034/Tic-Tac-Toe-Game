import { useState } from "react";

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
      setTurn("O"); // Switch turns
    } else if (board[index] === null && turn === "O") {
      const newBoard = [...board];
      newBoard[index] = player2;
      setBoard(newBoard);
      checkscore(newBoard);
      setTurn("X"); // Switch turns
    }
  }
  function checkscore(board) {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setwinner(board[a] === player1 ? "Player 1" : "Player 2");
        const intervalId = setInterval(() => {
          handleRestart();
          clearInterval(intervalId); // Clear the interval
        }, 1000);
        return;
      }
    }

    if (!board.includes(null)) {
      setwinner("It's a tie!");
    }
  }

  // Check for tie
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
function Play({ board, handlepick }) {
  return (
    <>
      <div className="shefagn"></div>
      <div className="playground">
        {board.map((cell, index) => (
          <button
            value={index}
            className="btn"
            onClick={() => handlepick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
    </>
  );
}
function Restart({ onRestart }) {
  return (
    <div className="res">
      <button className="btn-reset" onClick={() => onRestart()}>
        Restart game
      </button>
    </div>
  );
}

function Currentplayer({ turn, winner }) {
  let style = {
    fontSize: "x-large",
    marginLeft: "38%",
  };
  if (winner) {
    style = {
      fontSize: "x-large",
      marginLeft: "32%",
      fontColor: "green",
    };
  }

  return (
    <div className="turn">
      <div style={style}>
        {winner
          ? `The winner is ${winner}`
          : turn === "X"
          ? "Player 1 turn"
          : "Player 2 turn"}
      </div>
    </div>
  );
}
