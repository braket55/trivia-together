import scienceQuestions from "../data/questions/science.json";
import disneyQuestions from "../data/questions/disney.json";
import sportsQuestions from "../data/questions/sports.json";
import geographyQuestions from "../data/questions/geography.json";
import moviesQuestions from "../data/questions/movies.json";
import booksQuestions from "../data/questions/books.json";
import historyQuestions from "../data/questions/history.json";
import generalQuestions from "../data/questions/general.json";

const QUESTION_PACKS = [
  scienceQuestions,
  disneyQuestions,
  sportsQuestions,
  geographyQuestions,
  moviesQuestions,
  booksQuestions,
  historyQuestions,
  generalQuestions,
];

export const CATEGORY_ICONS = {
  Science: "🔬",
  Disney: "🏰",
  Sports: "⚽",
  Geography: "🌎",
  Movies: "🎬",
  Books: "📚",
  History: "📜",
  General: "✨",
};

export const FALLBACK_CATEGORY_ICON = "❔";

export function loadQuestionBank() {
  return QUESTION_PACKS.flat();
}

export function getCategoriesFromQuestions(questions) {
  return [...new Set(questions.map((question) => question.category))].sort();
}

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] ?? FALLBACK_CATEGORY_ICON;
}

export function filterQuestionsByCategories(questions, selectedCategories) {
  return questions.filter((question) => selectedCategories.has(question.category));
}

export function shuffleQuestions(questions) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}