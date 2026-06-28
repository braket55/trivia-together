export const PLAYER_LABELS = {
  player1: "Husband",
  player2: "Wife",
};

export function getPlayerLabel(playerId) {
  return PLAYER_LABELS[playerId] ?? "Unknown Player";
}