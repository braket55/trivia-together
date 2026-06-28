import { useMemo, useState } from "react";
import { HomeScreen } from "./components/HomeScreen.jsx";
import { PlayScreen } from "./components/PlayScreen.jsx";
import { StatsScreen } from "./components/StatsScreen.jsx";
import { SessionSummary } from "./components/SessionSummary.jsx";
import { ConfirmEndModal } from "./components/ConfirmEndModal.jsx";
import { getCategoriesFromQuestions, loadQuestionBank } from "./lib/questions.js";
import "./index.css";

const questionBank = loadQuestionBank();

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCategories, setSelectedCategories] = useState(
    () => new Set(getCategoriesFromQuestions(questionBank))
  );
  const [questionMode, setQuestionMode] = useState("unseen");
  const [showEndModal, setShowEndModal] = useState(false);

  const availableCategories = useMemo(
    () => getCategoriesFromQuestions(questionBank),
    []
  );

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
    setScreen("play");
  }

  function confirmEndSession() {
    setShowEndModal(false);
    setScreen("summary");
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
          onToggleCategory={toggleCategory}
          onToggleAll={toggleAllCategories}
          onChangeQuestionMode={setQuestionMode}
          onStartSession={startSession}
          onOpenStats={() => setScreen("stats")}
        />
      )}

      {screen === "play" && (
        <PlayScreen
          questionCount={questionBank.length}
          onRequestEnd={() => setShowEndModal(true)}
        />
      )}

      {screen === "stats" && <StatsScreen onBackHome={() => setScreen("home")} />}

      {screen === "summary" && (
        <SessionSummary
          onPlayAgain={() => setScreen("play")}
          onHome={() => setScreen("home")}
        />
      )}

      {showEndModal && (
        <ConfirmEndModal
          onResume={() => setShowEndModal(false)}
          onEnd={confirmEndSession}
        />
      )}
    </div>
  );
}

export default App;