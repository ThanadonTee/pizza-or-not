require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

var upload = multer({ dest: 'uploads/' });
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

app.post('/', upload.single('data'), (req, res, next) => {
	const { spawn } = require('child_process');
	const pyProg = spawn('python3', ['python/script.py', req.file.filename]);
	var output;
	pyProg.stdout.on('data', function (data) {
		try {
			fs.unlinkSync(req.file.path);
		} catch (err) {
			console.log(err);
		}
		output = data.toString().split('-');
		if (output[0] == 'not_pizza') {
			res.json({
				message: 'This is not a pizza. ' + output[1] + ' confident',
			});
		} else {
			res.json({
				message: 'This is a pizza. ' + output[1] + ' confident',
			});
		}
	});
});
