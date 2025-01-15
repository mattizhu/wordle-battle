export interface GameContextType {
  gameContext: GameContextStateType;
  updateGameContext: (newState: Partial<GameContextStateType>) => void;
}

export type GameContextStateType = {
  gameBoard: GameBoardTileType[];
  word: string | null;
  keyboardState: Record<string, GameKeyboardStateType>;
};
export type GameBoardTileType = {
  row: {
    letter: string | null,
    state: "absent" | "present" | "correct" | null;
  }[],
  active: boolean
};
export type GameKeyboardStateType = "absent" | "present" | "correct" | "default";
