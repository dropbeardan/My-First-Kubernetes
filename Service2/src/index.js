const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const commitRef = process.env.APP_COMMIT_REF || 'N/A';
const buildDate = process.env.APP_BUILD_DATE || new Date().toISOString();

app.get('/', (req, res) => {
	res.json({
		Service: 'Service 2',
		COMMIT_REF: process.env.APP_COMMIT_REF,
		BUILD_DATE: process.env.APP_BUILD_DATE,
		DB_NAME: process.env.DB_NAME,
		DB_USERNAME: process.env.DB_USERNAME,
		DB_PASSWORD: process.env.DB_PASSWORD
	});
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
