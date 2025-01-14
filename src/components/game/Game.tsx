"use client";

import {useEffect} from "react";
import wordExists from "word-exists";
import axios from "axios";
import {toast} from "sonner";

import GameBoard from "@/components/game/GameBoard";
import GameKeyboard from "@/components/game/GameKeyboard";
import {useGameContext} from "@/contexts/gameContext";

export default function Game() {
  const {gameContext, updateGameContext} = useGameContext();
  
  const init = async () => {
    const response = await axios.get("https://random-word-api.herokuapp.com/word?length=5");
    const gameBoard = gameContext.gameBoard;
    
    gameBoard[0].active = true;
    updateGameContext({gameBoard: gameBoard, word: response.data[0]});
  };

  const handleKeyInput = (event: KeyboardEvent) => {
    const gameBoard = [...gameContext.gameBoard];
    const activeRowIndex = gameContext.gameBoard.findIndex((tileRow) => tileRow.active);
    const currentTileRow = gameBoard[activeRowIndex];
    if (activeRowIndex === -1) return;
    
    switch(event.key) {
      case event.key.match(/^[a-zA-Z]$/)?.input:
        for (let i = 0; i < currentTileRow.row.length; i++) {
          if (currentTileRow.row[i].letter === null) {
            currentTileRow.row[i].letter = event.key;
            break;
          }
        }
        
        gameBoard[activeRowIndex] = {...gameBoard[activeRowIndex], row: currentTileRow.row};
        updateGameContext({gameBoard: gameBoard});
        break;
      case "Backspace":
        for (let i = currentTileRow.row.length - 1; i > -1; i--) {
          if (currentTileRow.row[i].letter !== null) {
            currentTileRow.row[i].letter = null;
            break;
          }
        }
        
        gameBoard[activeRowIndex] = {...gameBoard[activeRowIndex], row: currentTileRow.row};
        updateGameContext({gameBoard: gameBoard});
        break;
      case "Enter":
        if (currentTileRow.row.some((tile) => tile.letter === null)) return toast("Not enough letters!");
        if (!wordExists(currentTileRow.row.map((tile) => tile.letter).join(""))) return toast("Not a real word!");
        if (!gameContext.word) return;
        
        const nextTileRow = gameBoard[activeRowIndex + 1];
        const keyboardState = gameContext.keyboardState;
        const wordLetters = gameContext.word.split("");
        const remainingLetters: (string | null)[] = [...wordLetters];
        
        currentTileRow.row.forEach((tile, index) => {
          if (tile.letter === wordLetters[index]) {
            currentTileRow.row[index].state = "correct";
            keyboardState[tile.letter.toUpperCase()] = "correct";
            remainingLetters[index] = null;
          }
        });
        
        currentTileRow.row.forEach((tile, index) => {
          if (tile.letter !== null && currentTileRow.row[index].state !== "correct") {
            const letterIndex = remainingLetters.indexOf(tile.letter);
            
            if (letterIndex !== -1) {
              currentTileRow.row[index].state = "present";
              if (keyboardState[tile.letter.toUpperCase()] !== "correct") keyboardState[tile.letter.toUpperCase()] = "present";
              remainingLetters[letterIndex] = null;
            } else {
              currentTileRow.row[index].state = "absent";
              if (!["present", "correct"].includes(keyboardState[tile.letter.toUpperCase()])) keyboardState[tile.letter.toUpperCase()] = "absent";
            }
          }
        });

        currentTileRow.active = false;
        if (nextTileRow) nextTileRow.active = true;

        if (currentTileRow.row.every((tile) => tile.state === "correct")) {
          toast("You win!");
        } else if (gameBoard.every((tileRow) => !tileRow.active)) {
          toast(`You lose! Word is ${gameContext.word}!`);
        }
        
        gameBoard[activeRowIndex] = currentTileRow;
        if (nextTileRow) gameBoard[activeRowIndex + 1] = nextTileRow;
        updateGameContext({gameBoard: gameBoard, keyboardState: keyboardState});
    }
  };
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyInput);
    
    return () => {
      document.removeEventListener("keydown", handleKeyInput);
    }
  }, [gameContext]);

  useEffect(() => {
    init();
  }, []);
  
  return (
    <div id="game" className="flex flex-col grow">
      <GameBoard />
      <GameKeyboard />
    </div>
  );
};
