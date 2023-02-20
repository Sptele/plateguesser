/* Imports */
const express = require("express");
const cors = require("cors");
const pino = require("express-pino-logger")();
const fs = require("fs");
const leaderboard = require("./leaderboard.json");
const verifyToken = require("./middleware/auth");

/* Middleware setup */
const app = express();
app.use(express.json());
app.use(pino);
app.use(cors());

/**
 * @api {get} /api/ Get Leaderboard
 */
app.get("/api/", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.status(200).json(leaderboard);
});

/**
 * @api {get} /api/:id Get Leaderboard Entry by id
 */
app.get("/api/:id", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.status(200).json(leaderboard[req.params.id]);
});

/**
 * @api {post} /api/ Inserts Leaderboard Entry at proper index by score. Returns index of new entry.
 */
app.post("/api/", verifyToken, (req, res) => {
	const body = req.body;

	// Error if invalid body to prevent bad entries
	if (body.name === undefined || body.score === undefined) {
		res.status(400).json("Invalid Body! Must follow format { name, score }");
		return;
	}

	let newIndex = -1; // We need to track this in order to return it

	// Loop through array and insert entry where it is greater than the next entry (by score)
	for (let i = 0; i < leaderboard.length; i++) {
		if (leaderboard[i].score < body.score) {
			newIndex = i;
			leaderboard.splice(i, 0, body);
			break;
		}
	}

	// Just append the score
	if (newIndex === -1) {
		newIndex = leaderboard.length;
		leaderboard.push(body);
	}

	// Write to file
	// NOTE: fs.writeFile works from WORKING directory, not file directory
	fs.writeFile(
		"./server/leaderboard.json",
		JSON.stringify(leaderboard),
		"utf-8", // Charset
		(err) => {
			if (err) console.log(err);
			console.log("Updated leaderboard!"); // Status message
		}
	);

	res.setHeader("Content-Type", "application/json");
	res.status(200).json({ index: newIndex });
});

// Start server
app.listen(process.env.REACT_APP_SERVER_ROUTE.split(":")[2], () =>
	console.log(`[API] Running on ${process.env.REACT_APP_SERVER_ROUTE}!`)
);
