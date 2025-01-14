import Header from "@/components/Header";
import Game from "@/components/game/Game";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Game />
    </div>
  );
};
