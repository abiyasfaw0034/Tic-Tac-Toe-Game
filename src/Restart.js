export function Restart({ onRestart }) {
  return (
    <div className="res">
      <button className="btn-reset" onClick={() => onRestart()}>
        Restart game
      </button>
    </div>
  );
}
