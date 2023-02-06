import { useState } from "react";

import Guesser from "./Guesser";
import Config from "./Config";
import Footer from "./Footer";

function App() {
	const [config, setConfig] = useState({
		SHOW_DMV_COMMENTS: false,
		SHOW_PLATE_IMAGE: true,
		SHOW_SCORE: true,
		HIDDEN_TIME_LIMIT: 120,
	});

	const [score, setScore] = useState(0);
	const [gameMode, setGameMode] = useState(null);

	const [showHints, setShowHints] = useState(false);

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
				<button
					className={"text-button" + (showHints ? " clicked" : "")}
					onClick={() => setShowHints(!showHints)}
				>
					<h6>Hints</h6>
				</button>
				{showHints && (
					<ul>
						<li>
							The DMV is strict, so phrases that{" "}
							<strong>could</strong> cause rejection usually do
						</li>
						<li>
							The customer will usually provide an innocent
							meaning to their plate, so don't get mislead!
						</li>
						<li>
							The reviewer is <strong>human</strong>, so they may
							not always be perfectly logical
						</li>
						<li>
							Even though a plate may reference something
							explicit, the content may not be enough to get it
							rejected
						</li>
					</ul>
				)}
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
							onClick={() => setGameMode("timed")}
							className="p-2 border-2 border-black rounded-lg hover:border-blue-500"
						>
							<h4>Timed</h4>
							<span className="subtitle">
								Race against the clock to get as many right as
								possible. Your score does not reset on a wrong
								answer.
							</span>
							<h6>Time Limit:</h6>
							<input
								type="number"
								placeholder={config.HIDDEN_TIME_LIMIT}
								onClick={(e) => {
									e.stopPropagation();
								}}
								onChange={(e) =>
									(config.HIDDEN_TIME_LIMIT = parseInt(
										e.target.value
									))
								}
								className="w-12 border-b-2 border-b-blue-500 "
							/>
						</button>
						<button
							onClick={() => setGameMode("arcade")}
							className="p-2 border-2 border-black rounded-lg hover:border-blue-500"
						>
							<h4>Arcade</h4>
							<span className="subtitle">
								Race against the clock to get as many right as
								possible. Your score does not reset on a wrong
								answer.
							</span>
						</button>
					</div>
				</>
			)}

			<Config config={config} setConfig={setConfig} />
			<Footer />
		</div>
	);
}

export default App;
