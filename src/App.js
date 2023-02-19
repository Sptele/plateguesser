import { useState } from "react";

import Guesser from "./Guesser";
import Config from "./Config";
import Footer from "./Footer";
import Leaderboard from "./Leaderboard";

function App() {
	const [config, setConfig] = useState({
		SHOW_DMV_COMMENTS: false,
		SHOW_PLATE_IMAGE: true,
		SHOW_SCORE: true,
	});

	const [score, setScore] = useState(0);
	const [gameMode, setGameMode] = useState(null);

	return (
		<div className="text-center">
			<h1 className="text-6xl">Plate Guesser</h1>
			<h4 className="subtitle mt-2">
				Would you be fit as a DMV employee? Find out by guessing if the
				plates shown were approved or denied.
				<br />
				<br />
				The game is harder than it looks! By default, DMV Comments
				(which are essentially hints) are hidden to make it harder. Turn
				them on if you're stuck.
				<br />
				<hr className="m-4" />
			</h4>

			{gameMode ? (
				<Guesser
					config={config}
					score={score}
					setScore={setScore}
					gameMode={gameMode}
					setGameMode={setGameMode}
				/>
			) : (
				<>
					<h3>Game Modes</h3>
					<div className="grid grid-cols-2 grid-rows-1 max-w-md mx-auto gap-1">
						<button
							onClick={() => setGameMode("ranked")}
							className="p-2 border-2 border-black rounded-lg hover:border-blue-500"
						>
							<h4>Ranked</h4>
							<span className="subtitle">
								Think you're a DMV employee? Prove it by getting
								the highest score and placing on the
								leaderboard.
							</span>
						</button>
						<button
							onClick={() => setGameMode("arcade")}
							className="p-2 border-2 border-black rounded-lg hover:border-blue-500"
						>
							<h4>Arcade</h4>
							<span className="subtitle">
								Freely play as much as you want. Your score is
								tracked but not recorded.
							</span>
						</button>
					</div>
				</>
			)}

			<Config config={config} setConfig={setConfig} />

			<Leaderboard />
			<Footer />
		</div>
	);
}

export default App;
