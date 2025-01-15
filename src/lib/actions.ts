"use client";

import wordExists from "word-exists";
import {toast} from "sonner";

import {GameBoardTileType, GameKeyboardStateType} from "@/types/game.types";

export const addInput = (gameBoard: GameBoardTileType[], key: string): GameBoardTileType[] => {
	const activeRowIndex = gameBoard.findIndex((tileRow) => tileRow.active);
	const currentTileRow = gameBoard[activeRowIndex];
	
	for (let i = 0; i < currentTileRow.row.length; i++) {
		if (currentTileRow.row[i].letter === null) {
			currentTileRow.row[i].letter = key.toLowerCase();
			break;
		}
	}
	
	gameBoard[activeRowIndex] = {...gameBoard[activeRowIndex], row: currentTileRow.row};
	return gameBoard;
};

export const removeInput = (gameBoard: GameBoardTileType[]): GameBoardTileType[] => {
	const activeRowIndex = gameBoard.findIndex((tileRow) => tileRow.active);
	const currentTileRow = gameBoard[activeRowIndex];
	
	for (let i = currentTileRow.row.length - 1; i > -1; i--) {
		if (currentTileRow.row[i].letter !== null) {
			currentTileRow.row[i].letter = null;
			break;
		}
	}
	
	gameBoard[activeRowIndex] = {...gameBoard[activeRowIndex], row: currentTileRow.row};
	return gameBoard;
};

export const checkGuess = ({gameBoard, keyboardState, word}: {gameBoard: GameBoardTileType[], keyboardState: Record<string, GameKeyboardStateType>, word: string | null}): {gameBoard: GameBoardTileType[], keyboardState: Record<string, GameKeyboardStateType>} | undefined => {
	const activeRowIndex = gameBoard.findIndex((tileRow) => tileRow.active);
	const currentTileRow = gameBoard[activeRowIndex];
	
	if (!word) {
		return;
	} else	if (currentTileRow.row.some((tile) => tile.letter === null)) {
		toast("Not enough letters!");
	} else if (!wordExists(currentTileRow.row.map((tile) => tile.letter).join(""))) {
		toast("Not a real word!");
	} else {
		const remainingLetters: (string | null)[] = [...word.split("")];
	
		currentTileRow.active = false;
		currentTileRow.row.forEach((tile, index) => {
			if (tile.letter === word.split("")[index]) {
				currentTileRow.row[index].state = "correct";
				keyboardState[tile.letter.toUpperCase()] = "correct";
				remainingLetters[index] = null;
			}
		});
		currentTileRow.row.forEach((tile, index) => {
			if (tile.letter !== null && currentTileRow.row[index].state !== "correct") {
				if (remainingLetters.indexOf(tile.letter) !== -1) {
					currentTileRow.row[index].state = "present";
					if (keyboardState[tile.letter.toUpperCase()] !== "correct") keyboardState[tile.letter.toUpperCase()] = "present";
					remainingLetters[remainingLetters.indexOf(tile.letter)] = null;
				} else {
					currentTileRow.row[index].state = "absent";
					if (!["present", "correct"].includes(keyboardState[tile.letter.toUpperCase()])) keyboardState[tile.letter.toUpperCase()] = "absent";
				}
			}
		});
		
		if (currentTileRow.row.every((tile) => tile.state === "correct")) {
			toast("You win!");
		} else if (gameBoard[activeRowIndex + 1]) {
			gameBoard[activeRowIndex + 1].active = true;
		} else if (gameBoard.every((tileRow) => !tileRow.active)) {
			toast(`You lose! The word is ${word.toUpperCase()}!`);
		}
		
		gameBoard[activeRowIndex] = currentTileRow;
		return {gameBoard, keyboardState};
	}
}
