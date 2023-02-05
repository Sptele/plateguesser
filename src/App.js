import { useState } from "react";

import Guesser from "./Guesser";
import Config from "./Config";
import Footer from "./Footer";

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
				them on if you're stuck. Here are some other tips:
				<ul>
					<li>
						The DMV is strict, so phrases that{" "}
						<strong>could</strong> cause rejection usually do
					</li>
					<li>
						The customer will usually provide an innocent meaning to
						their plate, so don't get mislead!
					</li>
					<li>
						The reviewer is <strong>human</strong>, so they may not
						always be perfectly logical
					</li>
					<li>
						Even though a plate may reference something explicit,
						the content may not be enough to get it rejected
					</li>
				</ul>
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
				<div className="flex flex-col flex-grow items-center">
					<button onClick={() => setGameMode("survivor")}>
						Survivor
					</button>
					<button onClick={() => setGameMode("arcade")}>
						Arcade
					</button>
				</div>
			)}

			<Config config={config} setConfig={setConfig} />
			<Footer />
		</div>
	);
}

export default App;
