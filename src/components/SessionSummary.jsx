export function SessionSummary({ onPlayAgain, onHome }) {
  return (
    <main className="screen">
      <section className="hero-card">
        <p className="eyebrow">Session complete</p>
        <h1>Summary</h1>
        <p className="subtitle">
          Real session results will appear here once gameplay and stats are
          implemented.
        </p>
      </section>

      <section className="panel stats-placeholder">
        <div>
          <span>Player 1</span>
          <strong>0</strong>
        </div>
        <div>
          <span>Player 2</span>
          <strong>0</strong>
        </div>
        <div>
          <span>Questions</span>
          <strong>0</strong>
        </div>
      </section>

      <div className="home-actions">
        <button className="primary-button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="secondary-button" onClick={onHome}>
          Home
        </button>
      </div>
    </main>
  );
}