import { useState, useEffect } from "react";

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);

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
				<thead className="text-white bg-blue-400">
					<tr>
						<th style={{ width: "20%" }}>Rank</th>
						<th style={{ width: "40%" }}>Name</th>
						<th style={{ width: "40%" }}>Score</th>
					</tr>
				</thead>
				<tbody>
					{leaderboard.map((entry, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{entry.name}</td>
							<td>{entry.score}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboard;
