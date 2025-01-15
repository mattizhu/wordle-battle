"use client";

import {useEffect} from "react";
import axios from "axios";

import GameBoard from "@/components/game/GameBoard";
import GameKeyboard from "@/components/game/GameKeyboard";
import {useGameContext} from "@/contexts/gameContext";

import {addInput, checkGuess, removeInput} from "@/lib/actions";

export default function Game() {
  const {gameContext, updateGameContext} = useGameContext();
  
  const init = async () => {
    const response = await axios.get("https://random-word-api.herokuapp.com/word?length=5");
    const gameBoard = gameContext.gameBoard;
    
    gameBoard[0].active = true;
    updateGameContext({gameBoard: gameBoard, word: response.data[0]});
  };

  const handleKeyInput = (event: KeyboardEvent) => {
    const activeRowIndex = gameContext.gameBoard.findIndex((tileRow) => tileRow.active);
    if (activeRowIndex === -1 || !gameContext.word) return;
    
    switch(event.key) {
      case event.key.match(/^[a-zA-Z]$/)?.input:
        updateGameContext({gameBoard: addInput(gameContext.gameBoard, event.key)});
        break;
      case "Backspace":
        updateGameContext({gameBoard: removeInput(gameContext.gameBoard)});
        break;
      case "Enter":
        const response = checkGuess(gameContext);
        if (response?.gameBoard && response?.keyboardState) updateGameContext({gameBoard: response.gameBoard, keyboardState: response.keyboardState});
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
