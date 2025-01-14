"use client";

import React, {createContext, useContext, useState} from "react";

import {GameContextType, GameContextStateType} from "@/types/game.types";

const GameContext = createContext<GameContextType | undefined>(undefined);
const initialState: GameContextStateType = {
  gameBoard: Array(6).fill(null).map(() => ({row: Array(5).fill(null).map(() => ({letter: null, state: null})), active: false})),
  word: null,
  keyboardState: {
    Q: "default", W: "default", E: "default", R: "default", T: "default", Y: "default", U: "default", I: "default", O: "default", P: "default",
    A: "default", S: "default", D: "default", F: "default", G: "default", H: "default", J: "default", K: "default", L: "default",
    Z: "default", X: "default", C: "default", V: "default", B: "default", N: "default", M: "default"
  }
};

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const [gameContext, setGameContext] = useState<GameContextStateType>(initialState);
  const updateGameContext = (newState: Partial<GameContextStateType>) => {
    setGameContext((previousState) => ({...previousState, ...newState}));
  };
  
  return <GameContext value={{gameContext, updateGameContext}}>{children}</GameContext>;  
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGameContext must be used within GameContext");
  
  return context;
};
