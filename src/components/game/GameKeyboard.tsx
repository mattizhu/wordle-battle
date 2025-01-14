"use client";

import {Delete} from "lucide-react";

import {useGameContext} from "@/contexts/gameContext";

export default function GameKeyboard() {
  const {gameContext} = useGameContext();
  
  const generateKeys = (keySet: string[]) => {
    return keySet.map(key => (
      <div key={key} className={`flex flex-1 justify-center items-center ${["Enter", "Backspace"].includes(key) ? "min-w-20 text-base" : "min-w-10 text-2xl"} h-14 font-semibold  text-center uppercase rounded-md cursor-pointer select-none ${gameContext.keyboardState[key] === "correct" ? "bg-emerald-600 text-white" : gameContext.keyboardState[key] === "present" ? "bg-yellow-600 text-white" : gameContext.keyboardState[key] === "absent" ? "bg-neutral-800 text-neutral-500" : "bg-neutral-500 text-neutral-300"} transition-all hover:opacity-80`}>{key === "Backspace" ? <Delete /> : key}</div>
    ));
  };
  
  return (
    <div id="gameKeyboard" className=" flex-none">
      <div className="flex flex-col items-center mx-auto px-4 py-3 max-w-lg">
        <div className="mb-2 flex space-x-2">
          {generateKeys(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"])}
        </div>
        <div className="mb-2 flex space-x-2">
          {generateKeys(["A", "S", "D", "F", "G", "H", "J", "K", "L"])}
        </div>
        <div className="mb-2 flex space-x-2">
          {generateKeys(["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"])}
        </div>
      </div>
    </div>
  );
};
