import { useMemo, useState } from "react";
import "./index.css";

const MOCK_CATEGORIES = [
  "Science",
  "Disney",
  "Sports",
  "Geography",
  "Movies",
  "Books",
  "History",
  "General",
];

const CATEGORY_ICONS = {
  Science: "🔬",
  Disney: "🏰",
  Sports: "⚽",
  Geography: "🌎",
  Movies: "🎬",
  Books: "📚",
  History: "📜",
  General: "✨",
};

const FALLBACK_ICON = "❔";

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCategories, setSelectedCategories] = useState(
    () => new Set(MOCK_CATEGORIES)
  );
  const [questionMode, setQuestionMode] = useState("unseen");
  const [showEndModal, setShowEndModal] = useState(false);

  const allSelected = selectedCategories.size === MOCK_CATEGORIES.length;

  const categories = useMemo(() => {
    return MOCK_CATEGORIES.map((category) => ({
      name: category,
      icon: CATEGORY_ICONS[category] ?? FALLBACK_ICON,
      selected: selectedCategories.has(category),
    }));
  }, [selectedCategories]);

  function toggleCategory(category) {
    setSelectedCategories((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  }

  function toggleAllCategories() {
    setSelectedCategories(allSelected ? new Set() : new Set(MOCK_CATEGORIES));
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
          categories={categories}
          allSelected={allSelected}
          selectedCount={selectedCategories.size}
          questionMode={questionMode}
          onToggleCategory={toggleCategory}
          onToggleAll={toggleAllCategories}
          onChangeQuestionMode={setQuestionMode}
          onStartSession={startSession}
          onOpenStats={() => setScreen("stats")}
        />
      )}

      {screen === "play" && (
        <PlayScreen
          onRequestEnd={() => setShowEndModal(true)}
          onBackHome={() => setScreen("home")}
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

function HomeScreen({
  categories,
  allSelected,
  selectedCount,
  questionMode,
  onToggleCategory,
  onToggleAll,
  onChangeQuestionMode,
  onStartSession,
  onOpenStats,
}) {
  return (
    <main className="screen home-screen">
      <section className="hero-card">
        <div className="app-mark">📚</div>
        <p className="eyebrow">Offline couch trivia</p>
        <h1>Trivia Together</h1>
        <p className="subtitle">
          Buzz in, discuss out loud, reveal the answer, and keep playing as long
          as you want.
        </p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your pool</p>
            <h2>Categories</h2>
          </div>

          <button className="small-button" onClick={onToggleAll}>
            {allSelected ? "Clear All" : "Select All"}
          </button>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`category-card ${
                category.selected ? "selected" : ""
              }`}
              onClick={() => onToggleCategory(category.name)}
            >
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <p className="helper-text">
          {selectedCount === 0
            ? "Select at least one category to start."
            : `${selectedCount} ${
                selectedCount === 1 ? "category" : "categories"
              } selected.`}
        </p>
      </section>

      <section className="panel">
        <p className="eyebrow">Question mode</p>

        <div className="mode-toggle">
          <button
            className={questionMode === "unseen" ? "active" : ""}
            onClick={() => onChangeQuestionMode("unseen")}
          >
            Unseen Only
          </button>

          <button
            className={questionMode === "include-seen" ? "active" : ""}
            onClick={() => onChangeQuestionMode("include-seen")}
          >
            Include Seen
          </button>
        </div>
      </section>

      <div className="home-actions">
        <button
          className="primary-button"
          disabled={selectedCount === 0}
          onClick={onStartSession}
        >
          Start Session
        </button>

        <button className="secondary-button" onClick={onOpenStats}>
          Statistics
        </button>
      </div>

      <p className="storage-note">
        Questions and statistics will be stored locally on this device.
      </p>
    </main>
  );
}

function PlayScreen({ onRequestEnd }) {
  return (
    <main className="screen play-screen">
      <header className="play-header">
        <div>
          <p className="eyebrow">Milestone 1 placeholder</p>
          <h1>Question 1</h1>
        </div>

        <button className="icon-button" onClick={onRequestEnd}>
          ×
        </button>
      </header>

      <section className="question-card">
        <p className="question-meta">Science • Medium</p>
        <h2>Trivia questions will appear here in Milestone 2.</h2>
        <p>
          For now, this screen only proves that the navigation, layout, and end
          session confirmation work.
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

function StatsScreen({ onBackHome }) {
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

function SessionSummary({ onPlayAgain, onHome }) {
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

function ConfirmEndModal({ onResume, onEnd }) {
  return (
    <div className="modal-backdrop">
      <section className="modal-card">
        <p className="eyebrow">Pause</p>
        <h2>End this session?</h2>
        <p>
          You can resume the current session, or end it and go to the summary
          screen.
        </p>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onResume}>
            Resume Playing
          </button>
          <button className="danger-button" onClick={onEnd}>
            End Session
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;