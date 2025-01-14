"use client";

import {useGameContext} from "@/contexts/gameContext";

export default function GameBoard() {
  const {gameContext} = useGameContext();
  
  return (
    <div id="gameBoard" className="flex flex-auto items-center mx-auto py-12">
      <div id="board" className="flex flex-col space-y-1.5 w-[350px]">
        {gameContext.gameBoard.map((tileRow, rowIndex) => (
          <div key={rowIndex} className={`row row-${rowIndex} ${tileRow.active} flex flex-row items-center space-x-1.5`}>
            {tileRow.row.map((tile, tileIndex) => (
              <div key={tileIndex} className={`inline-flex w-full h-16 justify-center items-center text-center text-3xl font-bold uppercase border-2 rounded-sm select-none ${tile.state === "absent" ? "bg-neutral-800 border-neutral-800" : tile.state === "present" ? "bg-yellow-600 border-yellow-600" : tile.state === "correct" ? "bg-emerald-600 border-emerald-600" : "border-neutral-800"}`}>{tile.letter}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
