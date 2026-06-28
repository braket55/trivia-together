import { useState } from "react";
import { applyJudgement, getCurrentQuestion } from "../lib/game.js";

export function PlayScreen({
  session,
  setSession,
  onRequestEnd,
  onCompleteQuestionPool,
}) {
  const [buzzedPlayer, setBuzzedPlayer] = useState(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const currentQuestion = getCurrentQuestion(session);
  const sessionQuestionNumber = session.currentIndex + 1;

  function handleBuzz(player) {
    setBuzzedPlayer(player);
    setAnswerRevealed(false);
  }

  function handleJudgement(correctPlayer) {
    const nextSession = applyJudgement(
      session,
      currentQuestion,
      buzzedPlayer,
      correctPlayer
    );

    setSession(nextSession);
    setBuzzedPlayer(null);
    setAnswerRevealed(false);

    if (nextSession.currentIndex >= nextSession.questionQueue.length) {
      onCompleteQuestionPool();
    }
  }

  if (!currentQuestion) {
    return (
      <main className="screen play-screen">
        <section className="hero-card">
          <p className="eyebrow">All done</p>
          <h1>No question available</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="screen play-screen">
      <header className="play-header">
        <div>
          <p className="eyebrow">
            Question {sessionQuestionNumber} of {session.questionQueue.length}
          </p>
          <h1>Question {sessionQuestionNumber}</h1>
        </div>

        <button className="icon-button" onClick={onRequestEnd}>
          ×
        </button>
      </header>

      <section className="question-card">
        <p className="question-meta">
          {currentQuestion.category} • {currentQuestion.difficulty}
        </p>

        {currentQuestion.image && (
          <img
            className="question-image"
            src={currentQuestion.image.src}
            alt={currentQuestion.image.alt}
          />
        )}

        <h2>{currentQuestion.question}</h2>

        {!buzzedPlayer && (
          <p>Tap Player 1 or Player 2 to buzz in first.</p>
        )}

        {buzzedPlayer && !answerRevealed && (
          <section className="answer-panel">
            <p className="eyebrow">Buzzed in</p>
            <h3>{buzzedPlayer === "player1" ? "Player 1" : "Player 2"} buzzed first.</h3>
            <p>
              Say your answer out loud. The other player may agree or give a
              different answer.
            </p>
            <button
              className="primary-button"
              onClick={() => setAnswerRevealed(true)}
            >
              Reveal Answer
            </button>
          </section>
        )}

        {answerRevealed && (
          <section className="answer-panel revealed">
            <p className="eyebrow">Official answer</p>
            <h3>{currentQuestion.answer}</h3>

            {currentQuestion.acceptableAnswers?.length > 0 && (
              <p>
                <strong>Acceptable answers:</strong>{" "}
                {currentQuestion.acceptableAnswers.join(", ")}
              </p>
            )}

            {currentQuestion.explanation && (
              <p>
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            )}

            <div className="judge-grid">
              <button
                className="judge-button correct"
                onClick={() => handleJudgement("player1")}
              >
                Player 1 Correct
              </button>

              <button
                className="judge-button correct"
                onClick={() => handleJudgement("player2")}
              >
                Player 2 Correct
              </button>

              <button
                className="judge-button neither"
                onClick={() => handleJudgement("neither")}
              >
                Neither Correct
              </button>
            </div>
          </section>
        )}
      </section>

      <section className="buzz-grid">
        <button
          className="buzz-button"
          disabled={Boolean(buzzedPlayer)}
          onClick={() => handleBuzz("player1")}
        >
          Player 1
        </button>

        <button
          className="buzz-button"
          disabled={Boolean(buzzedPlayer)}
          onClick={() => handleBuzz("player2")}
        >
          Player 2
        </button>
      </section>

      <section className="mini-score-card">
        <div>
          <span>Player 1</span>
          <strong>{session.player1Score}</strong>
        </div>
        <div>
          <span>Player 2</span>
          <strong>{session.player2Score}</strong>
        </div>
        <div>
          <span>Answered</span>
          <strong>{session.answeredCount}</strong>
        </div>
      </section>
    </main>
  );
}