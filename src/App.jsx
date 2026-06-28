import { useMemo, useState } from "react";
import { HomeScreen } from "./components/HomeScreen.jsx";
import { PlayScreen } from "./components/PlayScreen.jsx";
import { StatsScreen } from "./components/StatsScreen.jsx";
import { SessionSummary } from "./components/SessionSummary.jsx";
import { ConfirmEndModal } from "./components/ConfirmEndModal.jsx";
import {
  filterQuestionsByCategories,
  getCategoriesFromQuestions,
  loadQuestionBank,
  shuffleQuestions,
} from "./lib/questions.js";
import { createEmptySession } from "./lib/game.js";
import "./index.css";

const questionBank = loadQuestionBank();

function App() {
  const availableCategories = useMemo(
    () => getCategoriesFromQuestions(questionBank),
    []
  );

  const [screen, setScreen] = useState("home");
  const [selectedCategories, setSelectedCategories] = useState(
    () => new Set(availableCategories)
  );
  const [questionMode, setQuestionMode] = useState("unseen");
  const [showEndModal, setShowEndModal] = useState(false);
  const [session, setSession] = useState(null);
  const [startMessage, setStartMessage] = useState("");

  const allSelected = selectedCategories.size === availableCategories.length;

  function toggleCategory(category) {
    setSelectedCategories((current) => {
      const next = new Set(current);
      next.has(category) ? next.delete(category) : next.add(category);
      return next;
    });
  }

  function toggleAllCategories() {
    setSelectedCategories(
      allSelected ? new Set() : new Set(availableCategories)
    );
  }

  function startSession() {
    if (selectedCategories.size === 0) return;

    const filteredQuestions = filterQuestionsByCategories(
      questionBank,
      selectedCategories
    );

    if (filteredQuestions.length === 0) {
      setStartMessage("No questions are available for those categories.");
      return;
    }

    const shuffledQuestions = shuffleQuestions(filteredQuestions);
    setSession(createEmptySession(shuffledQuestions));
    setStartMessage("");
    setScreen("play");
  }

  function endSession(reason = "ended-by-player") {
    setShowEndModal(false);
    setSession((current) =>
      current ? { ...current, summaryReason: reason } : current
    );
    setScreen("summary");
  }

  function playAgain() {
    startSession();
  }

  return (
    <div className="app-shell">
      {screen === "home" && (
        <HomeScreen
          categories={availableCategories}
          selectedCategories={selectedCategories}
          allSelected={allSelected}
          questionMode={questionMode}
          questionCount={questionBank.length}
          startMessage={startMessage}
          onToggleCategory={toggleCategory}
          onToggleAll={toggleAllCategories}
          onChangeQuestionMode={setQuestionMode}
          onStartSession={startSession}
          onOpenStats={() => setScreen("stats")}
        />
      )}

      {screen === "play" && session && (
        <PlayScreen
          session={session}
          setSession={setSession}
          onRequestEnd={() => setShowEndModal(true)}
          onCompleteQuestionPool={() => endSession("completed-question-pool")}
        />
      )}

      {screen === "stats" && <StatsScreen onBackHome={() => setScreen("home")} />}

      {screen === "summary" && (
        <SessionSummary
          session={session}
          onPlayAgain={playAgain}
          onHome={() => setScreen("home")}
        />
      )}

      {showEndModal && (
        <ConfirmEndModal
          onResume={() => setShowEndModal(false)}
          onEnd={() => endSession("ended-by-player")}
        />
      )}
    </div>
  );
}

export default App;