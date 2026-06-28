export function StatsScreen({ onBackHome }) {
  return (
    <main className="screen">
      <section className="hero-card">
        <p className="eyebrow">Coming soon</p>
        <h1>Statistics</h1>
        <p className="subtitle">
          Lifetime stats, category breakdowns, recent sessions, and backup /
          restore will live here later.
        </p>
      </section>

      <section className="panel stats-placeholder">
        <div>
          <span>Total Questions</span>
          <strong>0</strong>
        </div>
        <div>
          <span>Player 1 Correct</span>
          <strong>0</strong>
        </div>
        <div>
          <span>Player 2 Correct</span>
          <strong>0</strong>
        </div>
      </section>

      <button className="secondary-button" onClick={onBackHome}>
        Home
      </button>
    </main>
  );
}