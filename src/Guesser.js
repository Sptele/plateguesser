import data from "./data/applications.json";
import { useState, useEffect } from "react";

function Guesser({ config, score, setScore, gameMode, setGameMode, name }) {
	const [plateData, setPlateData] = useState(getRandomPlateData());
	const [isCorrect, setIsCorrect] = useState(null);
	const [isGameOver, setIsGameOver] = useState(false);

	/**
	 * Sets the isCorrent variable to whether or not the use was correct in their guess. This also edits the score or ends the game.
	 * @param {String} choice "Y" or "N" - what the user chose
	 */
	const makeChoice = (choice) => {
		setIsCorrect(choice === plateData.status);

		if (choice === plateData.status) {
			setScore(score + 1);
			setIsGameOver(false);
		} else {
			setIsGameOver(true);
		}
	};

	useEffect(() => {
		// Make sure we don't add 0's and also if the game is not over
		if (isGameOver === false || score === 0) return;

		// Add to the leaderboard in ranked mode
		if (gameMode === "ranked") {
			fetch(process.env.REACT_APP_SERVER_ROUTE + "/api/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer " + process.env.REACT_APP_SERVER_TOKEN,
				},
				body: JSON.stringify({ name, score }),
			});
		}

		// Both modes: reset the game
		setIsGameOver(false);
		setScore(0);
	}, [isGameOver]); // Change on game state change

	return (
		<div className="mt-5 max-w-lg mx-auto mb-4">
			<button
				onClick={() => {
					// Go back to the main menu state
					setGameMode(null);
					setScore(0);
				}}
				className="rounded-md bg-black text-white p-2 m-1"
			>
				Change Game Mode (Resets Score)
			</button>

			{/* Status indicator */}
			<div className="text-center rounded-lg border-2 border-gray-400 border-solid mb-2 p-4 max-w-md mx-auto">
				{isCorrect !== null && (
					<>
						<h1
							className={`mb-2 bg-${
								isCorrect === true ? "green" : "red"
							}-700 rounded-md p-2 pb-1 text-white`}
						>
							{isCorrect ? "Correct!" : "Wrong!"}
						</h1>

						<p className="text-gray-600">
							The DMV decided to{" "}
							{plateData.status === "Y" ? "accept" : "deny"}
						</p>
					</>
				)}

				{/* Plate */}
				<div className="p-3 rounded-md border-2 border-black">
					<h1>{parsePlate(plateData.plate)}</h1>
					<p className="subtitle">I'm a license plate :O</p>
				</div>

				{/* Formal Reasoning */}
				{isCorrect !== null &&
					plateData.status === "N" &&
					getReason(plateData.review_reason_code) !== null && (
						<p className="text-gray-600">
							because {getReason(plateData.review_reason_code)}
						</p>
					)}

				<div className="my-4">
					{/* Customer/DMV Thoughts */}
					<>
						<p className="subtitle">Customer Reason</p>
						<h5>
							{plateData.customer_meaning
								? plateData.customer_meaning
								: "No Customer Reason"}
						</h5>
					</>
					{(config.SHOW_DMV_COMMENTS || isCorrect !== null) && (
						<>
							<p className="subtitle">DMV Comments</p>
							<h5>
								{plateData.reviewer_comments
									? plateData.reviewer_comments
									: "No DMV Reason"}
							</h5>
						</>
					)}
				</div>

				<div className="flex flex-row flex-grow-0">
					{/* Choosers or Next/Retry Button*/}
					{isCorrect === null ? (
						<>
							<Button
								color="green"
								callback={() => makeChoice("Y")}
							>
								✓
							</Button>
							<Button
								color="red"
								callback={() => makeChoice("N")}
							>
								✖
							</Button>
						</>
					) : (
						<Button
							color="blue"
							callback={() => {
								setPlateData(getRandomPlateData());
								setIsCorrect(null);
							}}
						>
							{isCorrect === true || gameMode === "ranked"
								? "Next →"
								: "Retry ⟳"}
						</Button>
					)}
				</div>
			</div>
			{/* Score */}
			{config.SHOW_SCORE && (
				<div className="max-w-md rounded-full bg-blue-400 mx-auto p-4">
					<h1 className="text-white">{score}</h1>
				</div>
			)}
		</div>
	);
}

/**
 * Following Californian DMV conventions, replaces placeholder letters with their intended icons.
 * @param {String} plate The raw plate string
 * @returns parsed plate by UNICODE characters
 */
function parsePlate(plate) {
	return plate
		.replaceAll("#", "🖑")
		.replaceAll("$", "🖤")
		.replaceAll("&", "★");
}

/**
 * Following Frostbite's button designs, based on the color passed in, returns a button with the appropriate styling.
 * @returns JSX button
 */
function Button({ children, color, callback }) {
	let className = "grow ";
	switch (color) {
		case "green":
			className +=
				"focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
			break;
		case "red":
			className +=
				"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
			break;
		case "blue":
		default:
			className +=
				"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
			break;
	}
	return (
		<button type="button" className={className} onClick={callback}>
			{children}
		</button>
	);
}

/**
 * Gets a random row from the applications.json and returns it as an object.
 */
function getRandomPlateData() {
	const randomIndex = Math.floor(Math.random() * data.length);
	return data[randomIndex];
}

/**
 * Returns the formal reason based on the number. These have been formatted for how they are shown in-game.
 * @param {Number} status the number AS A STRING
 * @returns
 */
function getReason(status) {
	// 1. The configuration has a sexual connotation or is a term of lust or depravity.
	// 2. The configuration is a vulgar term; a term of contempt, prejudice, or hostility; an insulting or degrading term; a racially degrading term; or an ethnically degrading term.
	// 3. The configuration is a swear word or term considered profane, obscene, or repulsive.
	// 4. The configuration has a negative connotation to a specific group.
	// 5. The configuration misrepresents a law enforcement entity.
	// 6. The configuration has been deleted from regular series license plates.
	// 7. The configuration is a foreign or slang word or term, or is a phonetic spelling or mirror image of a word or term falling into the categories described in subdivisions 1. through 6. above.

	switch (status) {
		case "1":
			return "it has a sexual connotation or is a term of lust or depravity.";
		case "2":
			return "it is a vulgar term; a term of contempt, prejudice, or hostility; an insulting or degrading term; a racially degrading term; or an ethnically degrading term.";
		case "3":
			return "it is a swear word or term considered profane, obscene, or repulsive.";
		case "4":
			return "it has a negative connotation to a specific group.";
		case "5":
			return "it misrepresents a law enforcement entity.";
		case "6":
			return "it has been deleted from regular series license plates.";
		case "7":
			return "it is a foreign or slang word or term, or is a phonetic spelling or mirror image of a word or term falling into the categories described in subdivisions 1. through 6. above.";
		default:
			return null;
	}
}

export default Guesser;
