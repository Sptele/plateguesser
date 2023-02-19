import { useState, useEffect } from "react";

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);
	const [currentShow, setCurrentShow] = useState(5);

	useEffect(() => {
		fetch(process.env.REACT_APP_SERVER_ROUTE + "/api/")
			.then((response) => response.json())
			.then((state) => {
				setLeaderboard(state);
			});
	}, []);

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
					{leaderboard.map((entry, index) => {
						if (index >= currentShow) {
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
					<tr key={"buttons-table"}>
						<td colSpan={"3"} className="text-center">
							{currentShow <= leaderboard.length ? (
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
							{currentShow !== 0 ? (
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
