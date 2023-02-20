import { useState, useEffect } from "react";

function Leaderboard({ score }) {
	// Leaderborard and the amount of entries to show
	const [leaderboard, setLeaderboard] = useState([]);
	const [currentShow, setCurrentShow] = useState(5);

	useEffect(() => {
		// Get the leaderboard whenever the score changes
		fetch(process.env.REACT_APP_SERVER_ROUTE + "/api/")
			.then((response) => response.json())
			.then((state) => {
				setLeaderboard(state);
			});
	}, [score]);

	return (
		<div className="max-w-lg mx-auto mt-4">
			<h3>Leaderboard</h3>
			<table className="table-fixed p-2 mx-auto">
				<thead className={"text-white bg-blue-400"}>
					<tr>
						<th style={{ width: "20%" }}>Rank</th>
						<th style={{ width: "40%" }}>Name</th>
						<th style={{ width: "40%" }}>Score</th>
					</tr>
				</thead>
				<tbody>
					{/* Only show top 50 */}
					{leaderboard.subarray(0, 50).map((entry, index) => {
						// Only show amount of entries desired to be seen right now
						// Don't show null entries
						if (
							index >= currentShow ||
							entry.name === undefined ||
							entry.score === undefined
						) {
							return null;
						}

						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{entry.name}</td>
								<td>{entry.score}</td>
							</tr>
						);
					})}
					{/* Control how much of the leaderboard is shown */}
					<tr key={"buttons-table"}>
						<td colSpan={"3"} className="text-center">
							{leaderboard.length === 0 ? (
								<p>No Scores yet! Become the first one!</p>
							) : null}
							{leaderboard.length > 0 &&
							currentShow <= leaderboard.length ? (
								<button
									className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded inline mx-1"
									onClick={() =>
										setCurrentShow(currentShow + 5)
									}
								>
									Show{" "}
									{currentShow === 0 ? "Leaderboard" : "More"}
								</button>
							) : null}
							{leaderboard.length > 0 && currentShow !== 0 ? (
								<button
									className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded inline mx-1"
									onClick={() =>
										setCurrentShow(currentShow - 5)
									}
								>
									{currentShow - 5 <= 0
										? "Hide Leaderboard"
										: "Show Less"}
								</button>
							) : null}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboard;
