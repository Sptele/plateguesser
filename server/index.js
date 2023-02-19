const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pino = require("express-pino-logger")();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(cors());

const leaderboard = [
	{ name: "John Cena", score: 400 },
	{ name: "Gautam Gupta", score: 100 },
	{ name: "John Doe", score: 50 },
	{ name: "Jane Doe", score: 25 },
	{ name: "John Smith", score: 10 },
	{ name: "Jane Smith", score: 5 },
];

app.get("/api/", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(leaderboard));
});

app.get("/api/:id", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(leaderboard[req.params.id]));
});

app.post("/api/", (req, res) => {
	const body = req.body;
	leaderboard.push(body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(leaderboard));
});

app.post("/api/:id", (req, res) => {
	const body = req.body;
	leaderboard.splice(req.params.id, 0, body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(leaderboard));
});

app.listen(process.env.REACT_APP_SERVER_ROUTE.split(":")[2], () =>
	console.log(`[API] Running on ${process.env.REACT_APP_SERVER_ROUTE}!`)
);
