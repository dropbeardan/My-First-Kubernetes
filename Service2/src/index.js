const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const commitRef = process.env.APP_COMMIT_REF || 'N/A';
const buildDate = process.env.APP_BUILD_DATE || new Date().toISOString();

app.get('/', (req, res) => {
	res.send(
		`You have landed on Service 2.\n
		Commit: ${commitRef}\n
		Build Date: ${buildDate}`
	);
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
