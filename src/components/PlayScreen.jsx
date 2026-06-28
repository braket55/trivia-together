import { useState } from "react";
import { applyJudgement, getCurrentQuestion } from "../lib/game.js";
import {
  getPlayerEmoji,
  getPlayerLabel,
  getPlayerThemeClass,
} from "../lib/players.js";

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

        {!buzzedPlayer && <p>Tap Husband or Wife to buzz in first.</p>}

        {buzzedPlayer && !answerRevealed && (
          <section
            className={`turn-panel ${getPlayerThemeClass(buzzedPlayer)}`}
          >
            <div className="player-badge">
              <span>{getPlayerEmoji(buzzedPlayer)}</span>
              <strong>{getPlayerLabel(buzzedPlayer)}</strong>
            </div>

            <p>Your turn.</p>

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
                className="judge-button husband-choice"
                onClick={() => handleJudgement("player1")}
              >
                🟣 Husband Correct
              </button>

              <button
                className="judge-button wife-choice"
                onClick={() => handleJudgement("player2")}
              >
                🩵 Wife Correct
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
          className="buzz-button husband-buzz"
          disabled={Boolean(buzzedPlayer)}
          onClick={() => handleBuzz("player1")}
        >
          🐭 Husband
        </button>

        <button
          className="buzz-button wife-buzz"
          disabled={Boolean(buzzedPlayer)}
          onClick={() => handleBuzz("player2")}
        >
          🦊 Wife
        </button>
      </section>

      <section className="mini-score-card">
        <div>
          <span>🐭 Husband</span>
          <strong>{session.player1Score}</strong>
        </div>
        <div>
          <span>🦊 Wife</span>
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