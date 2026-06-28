import { getAccuracy, getWinner } from "../lib/game.js";

export function SessionSummary({ session, onPlayAgain, onHome }) {
  if (!session) {
    return (
      <main className="screen">
        <section className="hero-card">
          <p className="eyebrow">No session</p>
          <h1>Summary</h1>
          <p className="subtitle">Start a session to see results here.</p>
        </section>

        <button className="secondary-button" onClick={onHome}>
          Home
        </button>
      </main>
    );
  }

  const player1Accuracy = getAccuracy(session.player1Score, session.answeredCount);
  const player2Accuracy = getAccuracy(session.player2Score, session.answeredCount);

  return (
    <main className="screen">
      <section className="hero-card">
        <p className="eyebrow">Session complete</p>
        <h1>{getWinner(session)}</h1>

        {session.summaryReason === "completed-question-pool" ? (
          <p className="subtitle">
            You reached the end of the available questions for this session.
            Try Include Seen or select more categories next time.
          </p>
        ) : (
          <p className="subtitle">Here is your session summary.</p>
        )}
      </section>

      <section className="panel summary-grid">
        <SummaryStat label="Player 1 Score" value={session.player1Score} />
        <SummaryStat label="Player 2 Score" value={session.player2Score} />
        <SummaryStat label="Questions Played" value={session.answeredCount} />
        <SummaryStat label="Player 1 Buzzes" value={session.player1Buzzes} />
        <SummaryStat label="Player 2 Buzzes" value={session.player2Buzzes} />
        <SummaryStat label="Neither Correct" value={session.neitherCorrect} />
        <SummaryStat label="Player 1 Buzz Wins" value={session.player1BuzzWins} />
        <SummaryStat label="Player 2 Buzz Wins" value={session.player2BuzzWins} />
        <SummaryStat label="Player 1 Steals" value={session.player1Steals} />
        <SummaryStat label="Player 2 Steals" value={session.player2Steals} />
        <SummaryStat label="Player 1 Accuracy" value={`${player1Accuracy}%`} />
        <SummaryStat label="Player 2 Accuracy" value={`${player2Accuracy}%`} />
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

function SummaryStat({ label, value }) {
  return (
    <div className="summary-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}