require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.disable('x-powered-by');

app.listen(process.env.APP_PORT, () => {
	console.log(
		`Server is up on http://localhost:${
			process.env.APP_PORT
		} - ${new Date()}`
	);
});

app.get('/', (req, res, next) => {
	res.json({ message: 'Test response!' });
});
