export function Play({ board, handlepick }) {
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
