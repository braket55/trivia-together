export const PLAYERS = {
  player1: {
    label: "Husband",
    emoji: "🐭",
    themeClass: "husband-theme",
  },
  player2: {
    label: "Wife",
    emoji: "🦊",
    themeClass: "wife-theme",
  },
};

export function getPlayerLabel(playerId) {
  return PLAYERS[playerId]?.label ?? "Unknown Player";
}

export function getPlayerEmoji(playerId) {
  return PLAYERS[playerId]?.emoji ?? "❔";
}

export function getPlayerThemeClass(playerId) {
  return PLAYERS[playerId]?.themeClass ?? "";
}