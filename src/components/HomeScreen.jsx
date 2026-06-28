import { CategoryCard } from "./CategoryCard.jsx";

export function HomeScreen({
  categories,
  selectedCategories,
  allSelected,
  questionMode,
  questionCount,
  onToggleCategory,
  onToggleAll,
  onChangeQuestionMode,
  onStartSession,
  onOpenStats,
}) {
  const selectedCount = selectedCategories.size;

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
            <CategoryCard
              key={category}
              category={category}
              selected={selectedCategories.has(category)}
              onToggle={() => onToggleCategory(category)}
            />
          ))}
        </div>

        <p className="helper-text">
          {selectedCount === 0
            ? "Select at least one category to start."
            : `${selectedCount} ${
                selectedCount === 1 ? "category" : "categories"
              } selected • ${questionCount} starter questions loaded.`}
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