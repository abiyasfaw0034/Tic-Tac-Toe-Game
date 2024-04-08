export function Currentplayer({ turn, winner }) {
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
