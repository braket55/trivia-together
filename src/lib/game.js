export function createEmptySession(questionQueue) {
  return {
    questionQueue,
    currentIndex: 0,
    answeredCount: 0,
    player1Score: 0,
    player2Score: 0,
    player1Buzzes: 0,
    player2Buzzes: 0,
    player1BuzzWins: 0,
    player2BuzzWins: 0,
    player1Steals: 0,
    player2Steals: 0,
    neitherCorrect: 0,
    results: [],
    summaryReason: "ended-by-player",
  };
}

export function getCurrentQuestion(session) {
  return session.questionQueue[session.currentIndex] ?? null;
}

export function applyJudgement(session, question, buzzedPlayer, correctPlayer) {
  const isPlayer1Correct = correctPlayer === "player1";
  const isPlayer2Correct = correctPlayer === "player2";
  const isNeitherCorrect = correctPlayer === "neither";

  const nextSession = {
    ...session,
    answeredCount: session.answeredCount + 1,
    player1Score: session.player1Score + (isPlayer1Correct ? 1 : 0),
    player2Score: session.player2Score + (isPlayer2Correct ? 1 : 0),
    player1Buzzes:
      session.player1Buzzes + (buzzedPlayer === "player1" ? 1 : 0),
    player2Buzzes:
      session.player2Buzzes + (buzzedPlayer === "player2" ? 1 : 0),
    neitherCorrect:
      session.neitherCorrect + (isNeitherCorrect ? 1 : 0),
    currentIndex: session.currentIndex + 1,
    results: [
      ...session.results,
      {
        questionId: question.id,
        category: question.category,
        difficulty: question.difficulty,
        buzzedPlayer,
        correctPlayer,
      },
    ],
  };

  if (correctPlayer === buzzedPlayer) {
    if (correctPlayer === "player1") nextSession.player1BuzzWins += 1;
    if (correctPlayer === "player2") nextSession.player2BuzzWins += 1;
  }

  if (correctPlayer !== "neither" && correctPlayer !== buzzedPlayer) {
    if (correctPlayer === "player1") nextSession.player1Steals += 1;
    if (correctPlayer === "player2") nextSession.player2Steals += 1;
  }

  if (nextSession.currentIndex >= nextSession.questionQueue.length) {
    nextSession.summaryReason = "completed-question-pool";
  }

  return nextSession;
}

export function getAccuracy(correct, answeredCount) {
  if (answeredCount === 0) return 0;
  return Math.round((correct / answeredCount) * 100);
}

export function getWinner(session) {
  if (session.player1Score > session.player2Score) return "Husband wins!";
  if (session.player2Score > session.player1Score) return "Wife wins!";
  return "It’s a tie!";
}