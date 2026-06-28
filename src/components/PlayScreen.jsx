export function PlayScreen({ questionCount, onRequestEnd }) {
  return (
    <main className="screen play-screen">
      <header className="play-header">
        <div>
          <p className="eyebrow">Question engine ready</p>
          <h1>Question 1</h1>
        </div>

        <button className="icon-button" onClick={onRequestEnd}>
          ×
        </button>
      </header>

      <section className="question-card">
        <p className="question-meta">{questionCount} questions loaded</p>
        <h2>Static question files are now connected.</h2>
        <p>
          In the next milestone, this screen will filter the question bank,
          choose a random question, and begin the real gameplay loop.
        </p>
      </section>

      <section className="buzz-grid">
        <button className="buzz-button">Player 1</button>
        <button className="buzz-button">Player 2</button>
      </section>

      <section className="mini-score-card">
        <div>
          <span>Player 1</span>
          <strong>0</strong>
        </div>
        <div>
          <span>Player 2</span>
          <strong>0</strong>
        </div>
        <div>
          <span>Answered</span>
          <strong>0</strong>
        </div>
      </section>
    </main>
  );
}