import { getCategoryIcon } from "../lib/questions.js";

export function CategoryCard({ category, selected, onToggle }) {
  return (
    <button
      className={`category-card ${selected ? "selected" : ""}`}
      onClick={onToggle}
    >
      <span className="category-icon">{getCategoryIcon(category)}</span>
      <span>{category}</span>
    </button>
  );
}