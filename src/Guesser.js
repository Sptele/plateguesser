import data from "./data/applications.json";
import { useState } from "react";

function Guesser({ config, score, setScore, gameMode, setGameMode }) {
	const [plateData, setPlateData] = useState(getRandomPlateData());
	const [isCorrect, setIsCorrect] = useState(null);

	const makeChoice = (choice) => {
		setIsCorrect(choice === plateData.status);

		if (choice === plateData.status) { setScore(score + 1); }
		else {
			setScore(0);
		}

	};

	return (
		<div className="mt-10 max-w-lg mx-auto mb-4">
			<button onClick={() => setGameMode(null)}>Change Game Mode</button>
			<div className="text-center rounded-lg border-2 border-gray-400 border-solid mb-2 p-4 max-w-md mx-auto">
				{isCorrect !== null && (
					<>
						<h1 className={`mb-2 bg-${isCorrect === true ? "green" : "red"}-700 rounded-md p-2 pb-1 text-white`}>
							{isCorrect ? "Correct!" : "Wrong!"}
						</h1>

						<p className="text-gray-600">
							The DMV decided to{" "}
							{plateData.status === "Y" ? "accept" : "deny"}
						</p>
					</>
				)}
				<h1>{parsePlate(plateData.plate)}</h1>
				{isCorrect !== null &&
					plateData.status === "N" &&
					getReason(plateData.review_reason_code) !== null && (
						<p className="text-gray-600">
							because {getReason(plateData.review_reason_code)}
						</p>
					)}

				<div className="my-4">
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
							Next →
						</Button>
					)}
				</div>
			</div>
			<div className="max-w-md rounded-full bg-blue-400 mx-auto p-4">
				<h1 className="text-white">{score}</h1>
			</div>
		</div>
	);
}

function parsePlate(plate) {
	return plate
		.replaceAll("#", "🖑")
		.replaceAll("$", "🖤")
		.replaceAll("&", "★");
}

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
