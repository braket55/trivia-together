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

  const husbandAccuracy = getAccuracy(session.player1Score, session.answeredCount);
  const wifeAccuracy = getAccuracy(session.player2Score, session.answeredCount);

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
        <SummaryStat label="Husband Score" value={session.player1Score} />
        <SummaryStat label="Wife Score" value={session.player2Score} />
        <SummaryStat label="Questions Played" value={session.answeredCount} />
        <SummaryStat label="Husband Buzzes" value={session.player1Buzzes} />
        <SummaryStat label="Wife Buzzes" value={session.player2Buzzes} />
        <SummaryStat label="Neither Correct" value={session.neitherCorrect} />
        <SummaryStat label="Husband Buzz Wins" value={session.player1BuzzWins} />
        <SummaryStat label="Wife Buzz Wins" value={session.player2BuzzWins} />
        <SummaryStat label="Husband Steals" value={session.player1Steals} />
        <SummaryStat label="Wife Steals" value={session.player2Steals} />
        <SummaryStat label="Husband Accuracy" value={`${husbandAccuracy}%`} />
        <SummaryStat label="Wife Accuracy" value={`${wifeAccuracy}%`} />
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